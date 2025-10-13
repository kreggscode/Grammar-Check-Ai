const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshots() {
    console.log('🚀 Starting screenshot capture...');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    const landingPagePath = path.join(__dirname, 'index.html');
    const landingPageUrl = `file://${landingPagePath}`;

    console.log('📄 Opening landing page...');
    await page.goto(landingPageUrl);

    // Wait for page to load completely
    await page.waitForTimeout(1000);

    try {
        // 1. Hero Section Screenshot
        console.log('📸 Taking hero section screenshot...');
        await page.screenshot({
            path: 'landing-hero.png',
            clip: { x: 0, y: 0, width: 1200, height: 600 },
            fullPage: false
        });
        console.log('✅ Hero section saved as landing-hero.png');

        // 2. Features Section
        console.log('📸 Taking features section screenshot...');
        await page.evaluate(() => {
            const featuresSection = document.querySelector('.features') || document.querySelector('[class*="feature"]');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        await page.waitForTimeout(500);

        await page.screenshot({
            path: 'features-section.png',
            clip: { x: 0, y: 150, width: 1200, height: 400 },
            fullPage: false
        });
        console.log('✅ Features section saved as features-section.png');

        // 3. How It Works Section
        console.log('📸 Taking how-it-works section screenshot...');
        await page.evaluate(() => {
            const howItWorksSection = document.querySelector('.how-it-works') ||
                                     document.querySelector('[class*="how"]') ||
                                     document.querySelector('[class*="step"]');
            if (howItWorksSection) {
                howItWorksSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        await page.waitForTimeout(500);

        await page.screenshot({
            path: 'how-it-works.png',
            clip: { x: 0, y: 150, width: 1200, height: 400 },
            fullPage: false
        });
        console.log('✅ How it works section saved as how-it-works.png');

        // 4. Testimonials Section
        console.log('📸 Taking testimonials section screenshot...');
        await page.evaluate(() => {
            const testimonialsSection = document.querySelector('.testimonials') ||
                                       document.querySelector('[class*="testimonial"]') ||
                                       document.querySelector('[class*="review"]');
            if (testimonialsSection) {
                testimonialsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        await page.waitForTimeout(500);

        await page.screenshot({
            path: 'testimonials.png',
            clip: { x: 0, y: 150, width: 1200, height: 400 },
            fullPage: false
        });
        console.log('✅ Testimonials section saved as testimonials.png');

        // 5. Full page screenshot as backup
        console.log('📸 Taking full page screenshot...');
        await page.screenshot({
            path: 'landing-page-full.png',
            fullPage: true
        });
        console.log('✅ Full page saved as landing-page-full.png');

    } catch (error) {
        console.error('❌ Error taking screenshots:', error);
    }

    await browser.close();
    console.log('🎉 Screenshot capture completed!');
    console.log('\n📁 Screenshots saved in current directory:');
    console.log('   - landing-hero.png');
    console.log('   - features-section.png');
    console.log('   - how-it-works.png');
    console.log('   - testimonials.png');
    console.log('   - landing-page-full.png');
    console.log('\n📤 Next: Upload these to GitHub and update README.md');
}

// Check if puppeteer is installed
try {
    require('puppeteer');
    takeScreenshots();
} catch (error) {
    console.log('❌ Puppeteer not installed.');
    console.log('📦 Install with: npm install puppeteer');
    console.log('💡 Alternative: Use the screenshot-helper.html file to take manual screenshots');
}
