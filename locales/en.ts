export const en = {
  langName: "English",
  skip: "Skip to content",
  nav: {
    about: "About",
    eligibility: "Eligibility",
    roadmap: "Roadmap",
    team: "Team",
    volunteer: "Volunteer",
    contact: "Contact",
    apply: "Apply",
  },
  hero: {
    tagline: "Uniting Farmers. Elevating Value. Empowering Bhavani.",
    intro:
      "A localized, farmer-owned collective dedicated to eliminating middlemen, maximizing the per-nut value for our farmers, and building a sustainable coconut processing ecosystem in the Bhavani region.",
    cta: "Apply for Membership",
    cta2: "Volunteer with us",
  },
  vision: {
    title: "Our Vision & Mission",
    motto: "Better value for every coconut grown.",
    body1:
      "By pooling our resources, standardizing our quality, and collectively entering the market, we empower smallholders to move from being mere raw-material suppliers to owners of a profitable, value-added agricultural enterprise.",
    body2:
      "Our operations strictly align with the democratic, community-driven framework established by the Coconut Development Board of India.",
    jobsTitle: "Opportunity for Erode's youth and women",
    jobsIntro:
      "Beyond better prices for farmers, the society aims to create local livelihoods in Erode district.",
    jobs: [
      { h: "Jobs for youth", t: "Employment for the youth of Erode district as agri-tech engineers, sales and marketing experts, and harvesting professionals." },
      { h: "Women self-help groups", t: "Encouragement and support for women self-help groups who want to make coir-related products from our extracted fibre." },
      { h: "Local value", t: "Keeping processing, skills and income within the district instead of exporting raw nuts." },
    ],
  },
  eligibility: {
    title: "Membership Eligibility",
    intro:
      "We are opening our foundational cohort. To ensure strong initial supply and operational viability, we are onboarding only 40 founding members for this primary society.",
    cards: [
      {
        h: "Location",
        t: "Your coconut farm must be located within Erode district, Tamil Nadu.",
      },
      {
        h: "Farming scale",
        t: "A minimum of 10 fruit-bearing coconut trees, as set by the Coconut Development Board.",
      },
      {
        h: "Commitment",
        t: "Willingness to pool harvests and share primary processing infrastructure.",
      },
    ],
    priority:
      "Priority for founding seats: farmers with 100 or more yielding trees give the society immediate commercial volume and are prioritised for the 40 founding seats. Everyone who meets the minimum is welcome to apply. If more than 40 farmers apply, we will form additional societies.",
    source: "Source: CDB bye-laws",
    taluksSource: "Erode district taluks",
  },
  roadmap: {
    title: "Our Strategic Roadmap",
    intro: "Four steps, from forming the society to building a full agricultural enterprise.",
    current: "Current Phase",
    stepLabel: "Step",
    // Short labels drawn inside the roadmap image
    svg: [
      { title: "Formation", items: ["Enrol 40 founding members", "First general meeting", "Elect the board, adopt bye-laws", "Register the society"] },
      { title: "Foundation", items: ["Nut grading & sales", "Husk / shell split", "Coir fibre & coco pith"] },
      { title: "Federation", items: ["Join neighbouring societies", "AMC farm care", "Copra & desiccated coconut", "Shell sales"] },
      { title: "Manufacturing", items: ["Direct distribution", "Coir ropes & mattresses", "Eco-friendly bags"] },
    ],
    steps: [
      {
        title: "Forming the Society",
        sub: "We are forming a farmer-owned society. It does not exist yet, and the farmers who join will build it.",
        items: [
          { h: "Founding members", t: "Enrolling 40 founding farmers from Erode district who meet the eligibility criteria." },
          { h: "Board election", t: "At the first general meeting, the founding members elect the first Board of Directors by vote. Until then, the promoters only organise the process." },
          { h: "Bye-laws and registration", t: "Adopting bye-laws in line with the Coconut Development Board framework, registering the society and opening its bank account." },
          { h: "Hiring a CEO", t: "Once registered, the elected board appoints a professional CEO to run day-to-day operations." },
        ],
      },
      {
        title: "Foundation & Primary Aggregation",
        sub: "Building our base and capturing immediate low-hanging value.",
        items: [
          { h: "Nut grading & sales", t: "Pooling our coconuts to grade them by class, weight and shape. We target premium local markets by selling whole nuts with the kudumi (tuft) retained." },
          { h: "Primary separation", t: "Splitting the coconut into the nut, shell and husk." },
          { h: "Minimal processing", t: "Basic infrastructure to extract coconut fibre and coco pith (coir dust). We pack and sell coco pith directly to the open market and nurseries in plastic sacks for immediate by-product revenue." },
        ],
      },
      {
        title: "Scaling into a Federation & Managed Services",
        sub: "Becoming a Coconut Producers Federation (CPF) by uniting with neighbouring farmer societies.",
        items: [
          { h: "Network expansion", t: "Sponsoring 1 to 2 additional neighbouring societies to increase our collective volume." },
          { h: "Professional farm management (AMC)", t: "End-to-end tree care, disease management and harvesting on an Annual Maintenance Contract for holdings with a minimum of 1,000 trees. Wherever feasible, we will use drones and robots for tasks such as crop monitoring, spraying, tree climbing and [harvesting](https://www.instagram.com/reel/Dd9gQE2TOrX/)." },
          { h: "Drying & copra", t: "Community copra drying yards for stable, high-value sales." },
          { h: "Food processing", t: "Machinery to produce and package Desiccated Coconut from fresh nuts." },
          { h: "Shell commercialization", t: "Aggregating shells for bulk industrial sales (charcoal or activated carbon production)." },
        ],
      },
      {
        title: "Advanced Manufacturing & Distribution",
        sub: "Evolving into a formidable agricultural enterprise with a dedicated B2B and B2C presence.",
        items: [
          { h: "Robust distribution", t: "Direct-to-buyer marketing channels and retail networks, bypassing traditional wholesale mandis." },
          { h: "Coir value chain", t: "Using market analysis to manufacture coir ropes, eco-friendly gunny bags and coir mattresses from our extracted fibre. [Watch this video](https://www.youtube.com/watch?v=gdmEUVOG1nQ)" },
        ],
      },
    ],
  },
  form: {
    title: "Join the Movement",
    intro: "Stop selling at distress prices. Join a collective that works for you. Apply for membership below.",
    notice: "Applying does not guarantee a seat. We will contact you on WhatsApp.",
    name: "Full legal name",
    phone: "Phone / WhatsApp number",
    phoneHint: "10-digit mobile number",
    age: "Age (years)",
    village: "Village / Panchayat",
    town: "Town",
    taluk: "Taluk",
    taluk0: "Select your taluk",
    district: "District",
    pin: "PIN code",
    trees: "Number of fruit-bearing coconut trees",
    treesHint: "Minimum 10",
    acres: "Total farm area (acres)",
    map: "Farm location (Google Maps pin)",
    mapHint:
      "Open Google Maps, long-press your farm, tap Share and paste the link here. Or use the button to share your current location.",
    mapBtn: "Use my current location",
    mapBusy: "Getting location...",
    mapDenied: "Could not get your location. You can paste a Google Maps link instead, or leave this blank and apply anyway.",
    amc: "Interested in future AMC farm management?",
    boardTip:
      "At the first general meeting, founding members nominate candidates and elect the Board of Directors, with one vote per member. Directors then serve a fixed term set by the bye-laws and are re-elected by the members. Founding members are expected to volunteer their time and to be helpful and considerate in assisting society members with their queries and needs.",
    board: "I am interested in being a Founding / Board Member",
    yes: "Yes",
    no: "No",
    choose: "Select",
    consent:
      "I agree that the society may store and use these details to contact me about membership.",
    submit: "Apply for Membership",
    sending: "Sending...",
    ok: "Thank you! Your application has been received.",
    okSub: "We will contact you on WhatsApp soon.",
    fail: "Sorry, we could not send your application. Please try again, or contact us directly on WhatsApp:",
    errors: {
      required: "This field is required",
      phone: "Enter a valid 10-digit mobile number",
      age: "Enter your age (18 to 100)",
      pin: "Enter a valid 6-digit PIN code",
      pinWarn: "This does not look like an Erode district PIN code (638xxx). Please double check.",
      trees: "At least 10 fruit-bearing trees are required",
      acres: "Enter the farm area in acres",
      map: "Enter a Google Maps link, or leave blank",
      consent: "Please accept to continue",
      captcha: "Please complete the spam check",
    },
  },
  team: {
    title: "Our Team",
    board: "Founding Promoters",
    boardNote: "The first Board of Directors will be elected by the founding members at the first general meeting.",
    advisors: "External Advisors",
  },
  volunteer: {
    title: "Volunteer With Us",
    intro: "We are looking for volunteers with experience to guide the society. If you can give your time and knowledge, we would love to hear from you.",
    apply: "Apply to volunteer",
    roles: [
      {
        id: "agri",
        h: "Coconut Farm Agri Expert",
        t: "Someone familiar with coconut plantations and trees: how to maintain them, manage pests and diseases, and when to harvest.",
      },
      {
        id: "sales",
        h: "Sales & Marketing Expert",
        t: "Someone who understands the open markets in Erode district for coconuts and shells, and can find buyers for value-added products. Can also advise on when to sell.",
      },
      {
        id: "harvest",
        h: "Harvesting Engineer / Manager",
        t: "Someone with experience harvesting coconut trees who can arrange manpower, bring in modern equipment, and knows the business of harvesting.",
      },
    ],
    form: {
      title: "Volunteer application",
      name: "Full name",
      phone: "Phone / WhatsApp number",
      email: "Email",
      linkedin: "LinkedIn profile link (optional)",
      place: "District / City",
      roles: "Which role(s) interest you?",
      exp: "Years of experience",
      note: "Tell us briefly about your background",
      consent: "I agree that the society may store and use these details to contact me.",
      submit: "Submit",
      ok: "Thank you for volunteering! We will contact you soon.",
      errors: { roles: "Select at least one role", email: "Enter a valid email address", linkedin: "Enter a LinkedIn link (linkedin.com/in/...) or leave blank", exp: "Enter your years of experience (0 to 70)" },
    },
  },
  refs: {
    title: "Resources & References",
    intro: "Official sources behind the information on this page.",
    open: "Opens in a new tab",
  },
  contact: {
    title: "Contact Us",
    intro: "For inquiries, message or call us. Both numbers are WhatsApp numbers.",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
  },
  footer: {
    rights: "Sri Bhavani Coconut Producers Society, Erode district, Tamil Nadu.",
  },
};

export type Dict = typeof en;
