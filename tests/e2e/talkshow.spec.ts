import { test, expect } from '@playwright/test';
import { site } from '../../src/content/site';

/**
 * The talkshow section's three scripted pieces: countdown, speaker carousel
 * arrows and poster lightbox. Static content is covered by static-content.spec.ts.
 */
const t = site.talkshow;
const starts = new Date(t.date.startsAt);
const ends = new Date(t.date.endsAt);

test.describe('talkshow countdown', () => {
  test('counts down before the start', async ({ page }) => {
    // Exactly 1 day, 2 hours, 3 minutes and 4 seconds before air time.
    await page.clock.setFixedTime(new Date(starts.getTime() - ((26 * 60 + 3) * 60 + 4) * 1000));
    await page.goto('/');

    const timer = page.getByRole('timer');
    await expect(timer).toBeVisible();
    await expect(timer.locator('[data-countdown-value]')).toHaveText(['01', '02', '03', '04']);
    await expect(page.getByText(t.countdown.live)).toBeHidden();
  });

  test('says the talkshow is live while it runs', async ({ page }) => {
    await page.clock.setFixedTime(new Date(starts.getTime() + 10 * 60 * 1000));
    await page.goto('/');

    await expect(page.getByText(t.countdown.live)).toBeVisible();
    await expect(page.getByRole('timer')).toBeHidden();
  });

  test('says the talkshow has ended afterwards', async ({ page }) => {
    await page.clock.setFixedTime(new Date(ends.getTime() + 60 * 1000));
    await page.goto('/');

    await expect(page.getByText(t.countdown.ended)).toBeVisible();
    await expect(page.getByRole('timer')).toBeHidden();
    await expect(page.getByText(t.countdown.live)).toBeHidden();
  });
});

test.describe('speaker carousel', () => {
  test('all four cards fit side by side on a laptop screen, with no arrows', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/');

    const track = page.locator('[data-carousel-track]');
    expect(await track.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
    const tops = await track.evaluate((el) =>
      Array.from(el.children as HTMLCollectionOf<HTMLElement>).map((card) => card.offsetTop)
    );
    expect(tops).toHaveLength(t.speakers.length);
    expect(new Set(tops).size).toBe(1);
    // Nothing to scroll, so no controls.
    await expect(page.locator('[data-carousel-controls]')).toBeHidden();
  });

  test('never moves on its own', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');

    const track = page.locator('[data-carousel-track]');
    await track.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await page.mouse.move(0, 0);
    await page.waitForTimeout(6000);
    expect(await track.evaluate((el) => el.scrollLeft)).toBe(0);
  });

  test('the arrows move the strip one card at a time', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const track = page.locator('[data-carousel-track]');
    const prev = page.getByRole('button', { name: t.carousel.previous });
    const next = page.getByRole('button', { name: t.carousel.next });
    await next.scrollIntoViewIfNeeded();

    await expect(prev).toBeDisabled();
    await expect(next).toBeEnabled();

    const scrollLeft = () => track.evaluate((el) => el.scrollLeft);
    const atEnd = () =>
      track.evaluate((el) => el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);

    await next.click();
    await expect.poll(scrollLeft).toBeGreaterThan(0);
    await expect(prev).toBeEnabled();

    // Walk to the end, one card per click; the next arrow then disables.
    for (let clicks = 1; !(await atEnd()) && clicks < t.speakers.length; clicks += 1) {
      const before = await scrollLeft();
      await next.click();
      await expect.poll(scrollLeft).toBeGreaterThan(before);
    }
    expect(await atEnd()).toBe(true);
    await expect(next).toBeDisabled();
  });
});

test.describe('poster lightbox', () => {
  test('opens the main poster and closes with Escape', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: t.posterAlt }).click();

    const dialog = page.locator('dialog[data-lightbox-dialog]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('img', { name: t.posterAlt })).toBeVisible();
    // Still on the home page: the link was upgraded, not followed.
    expect(new URL(page.url()).pathname).toBe('/');

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('the close button and a backdrop click both close it', async ({ page }) => {
    await page.goto('/');
    const dialog = page.locator('dialog[data-lightbox-dialog]');

    await page.getByRole('link', { name: t.posterAlt }).click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: t.closeLabel }).click();
    await expect(dialog).toBeHidden();

    await page.getByRole('link', { name: t.posterAlt }).click();
    await expect(dialog).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(dialog).toBeHidden();
  });
});
