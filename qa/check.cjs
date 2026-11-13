const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/local/bin/chromium', args: ['--no-sandbox'] });
  const issues = [];
  const results = [];
  try {
    for (const viewport of [{ width: 1440, height: 980 }, { width: 1280, height: 900 }, { width: 1024, height: 900 }, { width: 768, height: 900 }, { width: 390, height: 844 }, { width: 360, height: 800 }]) {
      const page = await browser.newPage({ viewport });
      page.on('console', (msg) => { if (msg.type() === 'error') issues.push(`console ${viewport.width}: ${msg.text()}`); });
      page.on('pageerror', (error) => issues.push(`page ${viewport.width}: ${error.message}`));
      const routes = [
        ['home', '/'], ['cars', '/cars'], ['vehicle', '/cars/porsche-panamera-4'], ['about', '/about'], ['contact', '/contact'],
      ];
      for (const [name, route] of routes) {
        const response = await page.goto(`http://127.0.0.1:3001${route}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(async () => {
          const images = [...document.images];
          images.forEach((image) => { image.loading = 'eager'; });
          await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
        });
        await page.waitForTimeout(200);
        const state = await page.evaluate(() => ({
          title: document.title,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          images: [...document.images].map((img) => ({ src: img.currentSrc || img.src, loaded: img.complete && img.naturalWidth > 0 })),
        }));
        const overflows = state.scrollWidth > state.clientWidth;
        const broken = state.images.filter((image) => !image.loaded);
        if (response.status() !== 200) issues.push(`${viewport.width} ${route}: HTTP ${response.status()}`);
        if (overflows) issues.push(`${viewport.width} ${route}: horizontal overflow ${state.scrollWidth}/${state.clientWidth}`);
        if (broken.length) issues.push(`${viewport.width} ${route}: ${broken.length} broken image(s)`);
        await page.screenshot({ path: `qa/${name}-${viewport.width}.png`, fullPage: true, animations: 'disabled' });
        results.push({ viewport: viewport.width, route, status: response.status(), title: state.title, overflow: overflows, imageCount: state.images.length, brokenImages: broken.length });
      }
      if (viewport.width === 390) {
        await page.goto('http://127.0.0.1:3001/', { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Open navigation menu' }).click();
        await page.screenshot({ path: 'qa/mobile-menu-390.png', fullPage: false, animations: 'disabled' });
        const menuExpanded = await page.getByRole('button', { name: 'Close navigation menu' }).getAttribute('aria-expanded');
        if (menuExpanded !== 'true') issues.push('mobile menu failed to open');
        await page.locator('.main-nav--open a[href="/about"]').click();
        await page.waitForURL('**/about', { timeout: 5000 }).catch(() => undefined);
        if (!new URL(page.url()).pathname.endsWith('/about')) issues.push(`mobile navigation link failed: ${page.url()}`);

        await page.goto('http://127.0.0.1:3001/cars', { waitUntil: 'networkidle' });
        await page.locator('summary').click();
        await page.locator('#filter-brand').selectOption('BMW');
        await page.screenshot({ path: 'qa/inventory-filter-open-390.png', fullPage: true, animations: 'disabled' });
        const bmwCount = await page.locator('.vehicle-card').count();
        if (bmwCount !== 1) issues.push(`brand filter expected 1 BMW, got ${bmwCount}`);
        await page.locator('#filter-brand').selectOption('');
        await page.locator('#vehicle-search').fill('expedition');
        const searchCount = await page.locator('.vehicle-card').count();
        if (searchCount !== 1) issues.push(`search expected 1 Expedition, got ${searchCount}`);
        await page.locator('#vehicle-search').fill('no-such-vehicle');
        await page.screenshot({ path: 'qa/inventory-empty-390.png', fullPage: true, animations: 'disabled' });
        if (!(await page.getByText('No vehicles match those filters.').count())) issues.push('empty state missing');

        await page.goto('http://127.0.0.1:3001/cars/porsche-panamera-4', { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Show image 2' }).click();
        if (!(await page.getByRole('dialog', { name: /image gallery/i }).count())) {
          await page.getByRole('button', { name: 'Open full-screen image gallery' }).click();
        } else {
          await page.getByRole('button', { name: 'Open full-screen image gallery' }).click();
        }
        const dialogCount = await page.getByRole('dialog').count();
        await page.screenshot({ path: 'qa/gallery-lightbox-390.png', fullPage: false, animations: 'disabled' });
        if (dialogCount !== 1) issues.push('gallery lightbox did not open');
        await page.keyboard.press('Escape');
        if (await page.getByRole('dialog').count()) issues.push('gallery lightbox did not close with Escape');
        await page.getByRole('button', { name: 'Send enquiry' }).click();
        if (!(await page.locator('[aria-invalid="true"]').count())) issues.push('form validation did not mark invalid inputs');

        await page.goto('http://127.0.0.1:3001/contact', { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Send enquiry' }).click();
        await page.screenshot({ path: 'qa/form-errors-390.png', fullPage: true, animations: 'disabled' });
        if (!(await page.locator('[aria-invalid="true"]').count())) issues.push('contact form validation did not mark invalid inputs');
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ results, issues }, null, 2));
  process.exit(issues.length ? 1 : 0);
})().catch((error) => { console.error(error); process.exit(1); });
