// Long-form blog content, aimed at the kind of searches people actually run
// ("roman style pizza vs neapolitan", "office pizza order berlin") rather
// than just short event announcements. Each post renders at /blog/<slug>/.
export const blogPosts = [
  {
    slug: 'how-much-pizza-per-person-to-order',
    title: 'How Much Pizza Per Person Should You Order?',
    description: 'A simple, real-world rule for how many pizzas to order for your Berlin office lunch, birthday, or private event, plus a calculator to do the math for you.',
    date: '2026-08-19',
    readTime: '4 min read',
    excerpt: 'Stood over an order form guessing whether 8 pizzas is too many or way too few for 25 coworkers? Here’s the real number, plus the "why" behind it.',
    body: [
      {
        type: 'p',
        text: 'If you’ve ever stood over an order form guessing whether 8 pizzas is too many or way too few for 25 coworkers, you’re not alone. We’ve catered enough Friedrichshain office lunches, birthdays, and team parties at Zia Maria to give you a real number instead of a guess. Here it is, plus the “why” behind it.',
      },
      {
        type: 'callout',
        title: '2 slices per person',
        text: 'That’s our house rule at Zia Maria, every pizza cut into 3 generous, Roman-style slices.',
      },
      {
        type: 'p',
        text: 'Our dough rests for days before it bakes and is thin, so a slice is a real meal, not a nibble. Two of those and most guests are genuinely full. That works out to roughly 2 pizzas for every 3 people, simple enough to do the math on the spot.',
      },
      { type: 'h2', text: 'Quick Reference' },
      {
        type: 'table',
        headers: ['Guests', 'Slices', 'Pizzas'],
        rows: [
          ['10', '20', '7'],
          ['25', '50', '17'],
          ['50', '100', '34'],
          ['100', '200', '67'],
        ],
      },
      { type: 'h2', text: 'A Real Order' },
      {
        type: 'p',
        text: '60 guests, 100 slices, one keg of beer. Textbook math said 120 slices, but with drinks flowing, people graze slower and eat over a longer window. When alcohol’s part of the event, you can often trim 10–15% off the standard count without anyone going hungry.',
      },
      { type: 'h2', text: 'Does the Crowd Change the Number?' },
      {
        type: 'p',
        text: 'People ask us all the time if an all-male team or a mixed office needs different amounts. Honestly? It usually evens out, 2 slices per person holds up across most groups we cater. What actually shifts the number is the event itself: a seated lunch needs a fuller portion per person, while an evening party where pizza is the main event lets guests graze for hours, so the same total feels more generous.',
      },
      { type: 'h2', text: 'Try It Yourself' },
      { type: 'calculator' },
      { type: 'h2', text: 'Before You Book' },
      {
        type: 'tips',
        items: [
          { title: 'Flag dietary needs early', text: 'Tell us about vegan or vegetarian guests up front, we’ve got great options, but not last-minute.' },
          { title: 'Pick delivery or pickup first', text: 'It changes timing and how we stage the bake so pizza arrives warm.' },
          { title: 'Mention if timing is loose', text: '“Whenever the meeting wraps” is fine, just tell us so we can plan around it.' },
          { title: 'Round up for daytime lunches', text: 'Evening parties self-correct over hours; a one-hour lunch doesn’t.' },
        ],
      },
      { type: 'h2', text: 'Why We Care About This' },
      {
        type: 'p',
        text: 'We’re a Roman-style pizzeria right in Friedrichshain, and this neighborhood runs on pizza parties, offices, studios, and teams just steps from our door. Our goal isn’t to be another delivery option. It’s to be the name Berlin businesses think of first, because we treat catering with the same care as a table for two: fresh dough, real ingredients, and enough food that nobody’s rationing their last slice.',
      },
    ],
  },
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
      { type: 'p', text: 'Neapolitan dough is made quickly, often same-day, and baked at extremely high heat for under two minutes. The result is a soft, chewy, slightly wet centre with a puffy, blistered edge. Roman-style dough, the kind we use at Zia Maria, rests slowly over several days. That long, cold rest breaks down the gluten and sugars far more thoroughly, which is what gives Roman pizza its signature texture: thin, light, and properly crisp all the way through, not just around the rim.' },
      { type: 'p', text: 'It’s a different goal entirely. Neapolitan pizza is built to be pillowy. Roman pizza is built to shatter slightly when you bite it, then stay light in your stomach afterward, no dense, doughy center weighing you down.' },
      { type: 'h2', text: 'The shape and the serve' },
      { type: 'p', text: 'Neapolitan pizza is almost always a single, round pie, eaten with a knife and fork or folded in quarters. Roman pizza has two common forms: pizza tonda (a thin, crisp round pie, closer to what you’ll find on our menu) and pizza al taglio (“by the cut”), baked in large rectangular trays and sold by weight or by the slice, popular for a fast, casual lunch.' },
      { type: 'p', text: 'That difference in format is part of why Roman-style pizza works so well for groups, business lunches, and catering. A Neapolitan pie is built for one or two people sharing a single pizza. A Roman tray is built to be cut, spread across a table, and shared properly, which is exactly the kind of eating we like to do here.' },
      { type: 'h2', text: 'Why we bake Roman' },
      { type: 'p', text: 'Neither style is “better”, they’re just doing different jobs. We chose Roman-style because it fits how we actually want people to eat with us: unhurried, shared, and light enough that a proper lunch doesn’t turn into an afternoon nap. If you’ve only ever had Neapolitan, it’s worth trying the difference for yourself, our full menu is fresh daily in Friedrichshain.' },
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
