// Long-form blog content, aimed at the kind of searches people actually run
// ("roman style pizza vs neapolitan", "office pizza order berlin") rather
// than just short event announcements. Each post renders at /blog/<slug>/.
export const blogPosts = [
  {
    slug: 'roman-style-vs-neapolitan-pizza',
    title: 'Roman-Style vs. Neapolitan Pizza: What’s the Difference?',
    description: 'Roman-style and Neapolitan pizza look similar but eat completely differently. Here’s what actually separates the two, and why Zia Maria bakes Roman.',
    date: '2026-08-05',
    readTime: '4 min read',
    excerpt: 'They both come from Italy, both use tomato and mozzarella, and they still taste like two different foods. Here’s why.',
    body: [
      { type: 'p', text: 'Ask ten people in Berlin what makes a pizza “authentic” and most will describe a Neapolitan pie: a thick, puffy, charred-edge crust from a wood-fired oven. That’s a fair answer, it’s just not the only one. Roman-style pizza is just as traditional, just as Italian, and built around an entirely different idea of what a good crust should do.' },
      { type: 'h2', text: 'It starts with the dough' },
      { type: 'p', text: 'Neapolitan dough is fermented quickly, often same-day, and baked at extremely high heat for under two minutes. The result is a soft, chewy, slightly wet centre with a puffy, blistered edge. Roman-style dough, the kind we use at Zia Maria, ferments slowly over several days. That long, cold fermentation breaks down the gluten and sugars far more thoroughly, which is what gives Roman pizza its signature texture: thin, light, and properly crisp all the way through, not just around the rim.' },
      { type: 'p', text: 'It’s a different goal entirely. Neapolitan pizza is built to be pillowy. Roman pizza is built to shatter slightly when you bite it, then stay light in your stomach afterward, no dense, doughy center weighing you down.' },
      { type: 'h2', text: 'The shape and the serve' },
      { type: 'p', text: 'Neapolitan pizza is almost always a single, round pie, eaten with a knife and fork or folded in quarters. Roman pizza has two common forms: pizza tonda (a thin, crisp round pie, closer to what you’ll find on our menu) and pizza al taglio (“by the cut”), baked in large rectangular trays and sold by weight or by the slice, popular for a fast, casual lunch.' },
      { type: 'p', text: 'That difference in format is part of why Roman-style pizza works so well for groups, business lunches, and catering. A Neapolitan pie is built for one or two people sharing a single pizza. A Roman tray is built to be cut, spread across a table, and shared properly, which is exactly the kind of eating we like to do here.' },
      { type: 'h2', text: 'Why we bake Roman' },
      { type: 'p', text: 'Neither style is “better”, they’re just doing different jobs. We chose Roman-style because it fits how we actually want people to eat with us: unhurried, shared, and light enough that a proper lunch doesn’t turn into an afternoon nap. If you’ve only ever had Neapolitan, it’s worth trying the difference for yourself, our full menu is fresh daily in Friedrichshain.' },
    ],
  },
  {
    slug: 'why-slow-fermented-dough-matters',
    title: 'Why We Let Our Dough Rest for Days, Not Hours',
    description: 'The single biggest factor in a good Roman-style pizza base isn’t the topping, it’s how long the dough ferments before it ever sees the oven.',
    date: '2026-07-22',
    readTime: '3 min read',
    excerpt: 'A crisp, light Roman crust isn’t about the oven. It’s about what happens to the dough days before it gets there.',
    body: [
      { type: 'p', text: 'It’s tempting to think a pizza’s quality comes down to the oven, or the toppings, or the cheese. In reality, most of the work happens long before any of that: in how the dough is fermented.' },
      { type: 'h2', text: 'What fermentation actually does' },
      { type: 'p', text: 'When dough rests, the yeast doesn’t just make it rise, it slowly breaks down starches and proteins in the flour over time. A fast, same-day dough hasn’t had time for much of that to happen, so it bakes into something soft and doughy in the middle. A dough that rests for several days in a cold environment has time for that breakdown to go much further, which is what produces a base that’s thin, light, and genuinely crisp, not just dry.' },
      { type: 'p', text: 'It also changes how digestible the pizza is. Slower fermentation means more of the starches are broken down before baking, which is a big part of why a proper Roman-style pizza doesn’t leave you feeling weighed down the way a rushed dough can.' },
      { type: 'h2', text: 'Why this is hard to fake' },
      { type: 'p', text: 'There’s no shortcut that replicates several days of slow, cold fermentation, you either give the dough the time or you don’t. It’s also less convenient: it means planning dough days in advance rather than mixing a batch the morning of service. We think the difference in the final bite is worth the extra planning, it’s the whole reason the base tastes like something rather than just being a vehicle for toppings.' },
      { type: 'p', text: 'Next time you’re comparing pizzas around Friedrichshain, pay attention to the crust on its own, before any topping. That’s where the real difference between a rushed pizza and a properly fermented one shows up.' },
    ],
  },
  {
    slug: 'office-pizza-order-berlin-guide',
    title: 'Planning an Office Pizza Order in Berlin: A Quick Guide',
    description: 'Ordering pizza for a team lunch or office event in Berlin? Here’s what to think through before you send the request, so it actually goes smoothly.',
    date: '2026-07-10',
    readTime: '4 min read',
    excerpt: 'A good office pizza order isn’t just “send a big pizza.” A few decisions upfront make it go a lot more smoothly.',
    body: [
      { type: 'p', text: 'Ordering pizza for an office lunch sounds simple until you’re the one doing it: how much do you order, how do you handle dietary needs without five separate orders, and how do you make sure it actually arrives while people are still hungry? A few decisions upfront make the whole thing much easier.' },
      { type: 'h2', text: 'Work out portions before you order' },
      { type: 'p', text: 'For a Roman-style pizza lunch, it helps to think in slices per person rather than “pizzas per person”, since trays are usually cut and shared rather than served as individual pies. As a rough guide, plan for a light lunch on the smaller end and a heartier meal on the larger end, and round up slightly, leftover pizza disappears fast in most offices.' },
      { type: 'h2', text: 'Sort dietary needs early, not on the day' },
      { type: 'p', text: 'The easiest way to avoid a last-minute scramble is to ask your team once, in advance: vegetarian, vegan, or no restrictions. A mixed order with a couple of vegetarian and vegan options covers most groups without needing a fully custom pizza for every person.' },
      { type: 'h2', text: 'One-off vs. standing order' },
      { type: 'p', text: 'If this is a one-off event, 24–48 hours notice is usually enough. If your office does this regularly, it’s worth setting up a standing weekly order instead of re-ordering from scratch every time, same day, same time, one less thing on anyone’s to-do list.' },
      { type: 'h2', text: 'Delivery timing matters more than people expect' },
      { type: 'p', text: 'Pizza that arrives right at the start of the lunch window, rather than 20 minutes into it, makes a bigger difference to how the meal feels than almost anything else. When you send your order, be specific about the exact time you want it on the table, not just “around lunch.”' },
      { type: 'p', text: 'If you’re planning a business lunch or a larger office event in Friedrichshain or further across Berlin, our business lunch page has current set options and a request form, we’re happy to build something around your team’s size and schedule.' },
    ],
  },
];

export function getBlogPost(slug) {
  return blogPosts.find((p) => p.slug === slug);
}
