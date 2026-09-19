const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://online-business-erp.com";
const KEYWORDS =
  "online business, oberp, online business erp, online business solution, website making, free website making, free dynamic website making, dynamic website making, static website making, erp solution, free erp solution, free fitness website, fitness website, free coaching website, coaching website, school website, business website, free business website, android app, ios app, desktop app";

const jsonLd = `{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "OBERP",
  "alternateName": "Online Business ERP",
  "url": "${SITE}",
  "logo": "${SITE}/assets/img/logo.jpg",
  "image": "${SITE}/assets/img/logo.jpg",
  "email": "admin@online-business-erp.com",
  "telephone": "+91-7898356505",
  "description": "OBERP (Online Business ERP) builds websites, Android and iOS apps, desktop software, and custom ERP solutions for growing businesses.",
  "areaServed": "IN",
  "priceRange": "Quote after meeting",
  "sameAs": []
}`;

function head({ title, description, canonical, extraCss = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>${title}</title>
		<meta name="description" content="${description}">
		<meta name="keywords" content="${KEYWORDS}">
		<meta name="author" content="OBERP">
		<meta name="robots" content="index, follow">
		<link rel="canonical" href="${SITE}/${canonical}">
		<link rel="icon" type="image/jpeg" href="assets/img/logo.jpg">
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="OBERP">
		<meta property="og:title" content="${title}">
		<meta property="og:description" content="${description}">
		<meta property="og:url" content="${SITE}/${canonical}">
		<meta property="og:image" content="${SITE}/assets/img/logo.jpg">
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="${title}">
		<meta name="twitter:description" content="${description}">
		<meta name="twitter:image" content="${SITE}/assets/img/logo.jpg">
		<script type="application/ld+json">${jsonLd}</script>
		<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,600">
		<link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
		<link rel="stylesheet" href="assets/fonts/themify-icons.css">
		<link rel="stylesheet" href="assets/owlcarousel/css/owl.carousel.css">
		<link rel="stylesheet" href="assets/owlcarousel/css/owl.theme.css">
		<link rel="stylesheet" href="assets/css/fonts.css">
		<link rel="stylesheet" href="assets/css/animate.css">
		<link rel="stylesheet" href="assets/css/magnific-popup.css">
		<link rel="stylesheet" href="assets/css/menu.css">
		${extraCss}
		<link rel="stylesheet" href="assets/css/style.css">
		<link rel="stylesheet" href="assets/css/responsive.css">
	</head>`;
}

function nav() {
  return `
    <body data-spy="scroll" data-offset="80">
		<div class="preloader">
			<div class="spinner">
				<div class="double-bounce1"></div>
				<div class="double-bounce2"></div>
			</div>
		</div>
		<div class="site-mobile-menu site-navbar-target">
		  <div class="site-mobile-menu-header">
			<div class="site-mobile-menu-close mt-3">
			  <span class="icon-close2 js-menu-toggle"></span>
			</div>
		  </div>
		  <div class="site-mobile-menu-body"></div>
		</div>
		<header class="site-navbar js-sticky-header site-navbar-target" role="banner">
		  <div class="container">
			<div class="row align-items-center">
			  <div class="col-6 col-xl-2">
				<div class="mb-0 site-logo"><a href="index.html"><img src="assets/img/logo.jpg" alt="OBERP - Online Business ERP"></a></div>
			  </div>
			  <div class="col-12 col-md-10 d-none d-xl-block">
				<nav class="site-navigation position-relative text-right" role="navigation">
				  <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
					<li><a class="nav-link" href="index.html">Home</a></li>
					<li><a class="nav-link" href="about.html">About</a></li>
					<li class="has-children">
					  <a href="service.html" class="nav-link">Services</a>
					  <ul class="dropdown">
						<li><a href="web-development.html" class="nav-link">Web Development</a></li>
						<li><a href="app-development.html" class="nav-link">App Development</a></li>
						<li><a href="desktop-app.html" class="nav-link">Desktop App Creation</a></li>
						<li><a href="static-website.html" class="nav-link">Static Website</a></li>
						<li><a href="dynamic-website.html" class="nav-link">Dynamic Website</a></li>
						<li><a href="erp-solution.html" class="nav-link">ERP Solution</a></li>
					  </ul>
					</li>
					<li class="has-children">
					  <a href="portfolio.html" class="nav-link">Portfolio</a>
					  <ul class="dropdown">
						<li><a href="project-fitness-freaks.html" class="nav-link">Fitness Freaks</a></li>
						<li><a href="project-coaching.html" class="nav-link">Coaching Management</a></li>
						<li><a href="project-construction.html" class="nav-link">Construction Website</a></li>
						<li><a href="project-branding.html" class="nav-link">Business Branding</a></li>
					  </ul>
					</li>
					<li><a class="nav-link" href="pricing.html">Pricing</a></li>
					<li><a class="nav-link" href="faq.html">FAQ</a></li>
					<li><a class="nav-link" href="contact.html">Contact</a></li>
				  </ul>
				</nav>
			  </div>
			   <div class="col-6 d-inline-block d-xl-none ml-md-0 py-3" style="position: relative; top: 3px;">
			   <a href="#" class="site-menu-toggle js-menu-toggle float-right"><span class="icon-menu h3"></span></a>
			   </div>
			</div>
		  </div>
		</header>`;
}

function pageBanner(title) {
  return `
		<section class="section-top" style="background-image: url(assets/img/bg/section-top.png);background-size:cover; background-position: center center;">
			<div class="container">
				<div class="row">
				  <div class="col-lg-12 col-sm-12 col-xs-12 text-center">
					<div class="section-top-title">
						<h1>${title}</h1>
					</div>
				  </div>
				</div>
			</div>
		</section>`;
}

function contactBlock(heading = "Get in touch.") {
  return `
		<div id="contact" class="contact_area section-padding">
			<div class="container">
				<div class="section-title text-center">
					<h2 class="section-title-white">${heading}</h2>
					<p class="section-title-white">Book a free consultation. We confirm charges after we understand your website, app, or ERP requirement.</p>
				</div>
				<div class="row">
					<div class="offset-lg-1 col-lg-10 col-sm-12 col-xs-12 text-center wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
						<div class="contact">
							<form id="contact-form" method="post">
								<div class="row">
									<div class="form-group col-md-6">
										<input type="text" name="name" class="form-control requiredField" placeholder="Name" required>
									</div>
									<div class="form-group col-md-6">
										<input type="email" name="email" class="form-control email requiredField" placeholder="Email" required>
									</div>
									<div class="form-group col-md-12">
										<input type="text" name="subject" class="form-control requiredField" placeholder="Subject" required>
									</div>
									<div class="form-group col-md-12">
										<textarea rows="6" name="message" class="form-control requiredField" placeholder="Tell us about your business website, app, or ERP need" required></textarea>
									</div>
									<div class="col-md-12 text-center">
										<button type="submit" name="submit" id="submitButton" class="contact_btn">Send Message</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>`;
}

function footer() {
  return `
		<div class="footer" style="background-image: url(assets/img/bg/footer.png);  background-size:cover;">
			<div class="container">
				<div class="row footer_bg">
					<div class="col-lg-3 col-sm-6 col-xs-12">
						<div class="footer_logo">
							<img src="assets/img/logo.jpg" alt="OBERP - Online Business ERP" />
							<p>OBERP (Online Business ERP) builds websites, mobile apps, desktop software, and ERP systems for growing businesses.</p>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 col-xs-12">
						<div class="single_footer">
							<h4>Services</h4>
							<ul>
								<li><a href="web-development.html">Web Development</a></li>
								<li><a href="app-development.html">App Development</a></li>
								<li><a href="desktop-app.html">Desktop App Creation</a></li>
								<li><a href="static-website.html">Static Website</a></li>
								<li><a href="dynamic-website.html">Dynamic Website</a></li>
								<li><a href="erp-solution.html">ERP Solution</a></li>
							</ul>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 col-xs-12">
						<div class="single_footer">
							<h4>Company</h4>
							<ul>
								<li><a href="about.html">About OBERP</a></li>
								<li><a href="portfolio.html">Portfolio</a></li>
								<li><a href="pricing.html">Pricing</a></li>
								<li><a href="faq.html">FAQ</a></li>
								<li><a href="contact.html">Contact</a></li>
							</ul>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 col-xs-12">
						<div class="single_footer footer_contact">
							<h4>Start a meeting</h4>
							<p>Charges are decided after we review your requirement.</p>
							<p class="quote_note"><a href="tel:+917898356505">+91 78983 56505</a></p>
							<p><a href="mailto:admin@online-business-erp.com">admin@online-business-erp.com</a></p>
							<p class="quote_note"><a class="btn_one" href="contact.html">Book a free consultation</a></p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12 text-center">
						<div class="footer_copyright">
							<p>&copy; 2026 OBERP. All Rights Reserved.</p>
						</div>
					</div>
				</div>
			</div>
		</div>`;
}

function scripts({ slider = false } = {}) {
  return `
		<script src="assets/js/jquery-1.12.4.min.js"></script>
		<script src="assets/bootstrap/js/bootstrap.min.js"></script>
		<script src="assets/js/modernizr-2.8.3.min.js"></script>
		<script src="assets/owlcarousel/js/owl.carousel.min.js"></script>
		<script src="assets/js/jquery.magnific-popup.min.js"></script>
		<script src="assets/js/jquery.mixitup.js"></script>
		<script src="assets/js/jquery.appear.js"></script>
		<script src="assets/js/jquery.inview.min.js"></script>
		${slider ? '<script src="assets/js/jquery.touchSwipe.min.js"></script>' : ""}
		<script src="assets/js/jquery.stellar.min.js"></script>
		<script src="assets/js/wow.min.js"></script>
		<script src="assets/js/form-contact.js"></script>
		<script src="assets/js/menu.js"></script>
		<script src="assets/js/jquery.sticky.js"></script>
		<script src="assets/js/scrolltopcontrol.js"></script>
		<script src="assets/js/scripts.js"></script>
    </body>
</html>`;
}

function page(opts, body) {
  return `${head(opts)}
${nav()}
${body}
${footer()}
${scripts({ slider: opts.slider })}`;
}

function serviceDetail({ h1, h2, intro, paragraphs, items }) {
  const list = items
    .map(
      (item, i) => `
							<div class="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.${i + 1}s" data-wow-offset="0">
								<div class="single_marketing">
									<div class="marketing_icon_img">
										<img src="assets/img/icon/${item.icon}" alt="${item.title}" />
									</div>
									<h3>${item.title}</h3>
									<p>${item.text}</p>
								</div>
							</div>`
    )
    .join("");
  return `
${pageBanner(h1)}
		<section class="marketing_area section-padding">
			<div class="container">
				<div class="row">
					<div class="col-lg-5 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
						<div class="marketing_content">
							<h2>${h2}</h2>
							<img src="assets/img/marketing.png" class="img-fluid" alt="${h1} by OBERP" />
						</div>
					</div>
					<div class="col-lg-7 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
						<div class="marketing_text">
							${paragraphs.map((p) => `<p>${p}</p>`).join("\n\t\t\t\t\t\t\t")}
							<p>Need a quote? Charges depend on scope and are confirmed after a meeting. Start with a free consultation.</p>
							<a class="btn_one" href="contact.html">Discuss this service</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="marketing_list_area section-padding">
			<div class="container">
				<div class="section-title text-center">
					<h2>${intro}</h2>
					<p>OBERP designs each build around your operations, not a generic template.</p>
				</div>
				<div class="row">
					<div class="col-lg-10 offset-lg-1 col-sm-12 col-xs-12">
						<div class="row">${list}
						</div>
					</div>
				</div>
			</div>
		</div>
${contactBlock("Ready to start this project?")}`;
}

function projectDetail({ h1, about, client, category, url, urlLabel, extra }) {
  return `
${pageBanner(h1)}
		<section class="single_project_area section-padding">
			<div class="container">
				<div class="row project_dec">
					<div class="col-lg-6 col-sm-12 col-xs-12">
						<div class="media-left">
							<img src="assets/img/portfolio/${extra.image}" class="img-fluid" alt="${h1}" />
						</div>
					</div>
					<div class="col-lg-6 col-sm-12 col-xs-12">
						<div class="project_details">
							<div class="about_project">
								<h4>About Project</h4>
								<p>${about}</p>
							</div>
							<div class="about_project_details">
								<ul>
									<li><i class="fa fa-user"></i><b>Client: </b>${client}</li>
									<li><i class="fa fa-folder"></i><b>Category: </b>${category}</li>
									<li><i class="fa fa-globe"></i><b>Project: </b>${url ? `<a href="${url}" target="_blank" rel="noopener">${urlLabel}</a>` : urlLabel}</li>
								</ul>
							</div>
							${url ? `<a class="btn_one" href="${url}" target="_blank" rel="noopener">See live project</a>` : `<a class="btn_one" href="contact.html">Request a similar build</a>`}
						</div>
					</div>
				</div>
				<div class="row section-padding">
					<div class="col-lg-12">
						<div class="marketing_text">
							<h2>What this project covers</h2>
							${extra.points.map((p) => `<p>${p}</p>`).join("\n\t\t\t\t\t\t\t")}
							<p>Looking for a fitness website, coaching website, construction website, school website, or business branding site? Book a free consultation and we will confirm charges after the meeting.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
${contactBlock("Want a similar online business solution?")}`;
}

const services = [
  {
    file: "web-development.html",
    title: "Web Development Company | Website Making | OBERP",
    description:
      "OBERP builds business websites, school websites, fitness websites, and coaching websites. Discuss free website making options and custom web development after a meeting.",
    canonical: "web-development.html",
    h1: "Web Development",
    h2: "Website making for online business, schools, gyms, and coaching brands.",
    intro: "Web development that supports real operations",
    paragraphs: [
      "OBERP is an online business solution partner for website making. We plan, design, and develop business websites that present your brand and collect enquiries.",
      "Choose a static website for a clear brochure presence or a dynamic website when you need logins, forms, catalogues, or admin control. We also discuss starter and free website making options during consultation so you know what is included before work begins.",
      "Typical builds include business websites, school websites, fitness websites, coaching websites, and construction websites. Every page is written for search terms such as online business, website making, and OBERP."
    ],
    items: [
      { icon: "web.png", title: "Business website", text: "A clear service site that explains what you sell and how to contact OBERP or your team." },
      { icon: "design.png", title: "Industry websites", text: "Fitness, coaching, school, and construction layouts built around your offer." },
      { icon: "research.png", title: "SEO-ready structure", text: "One H1, useful headings, internal links, and fast pages for online business search." },
      { icon: "strategy.png", title: "After-meeting pricing", text: "Scope and charges are confirmed after we review pages, features, and timeline." }
    ]
  },
  {
    file: "app-development.html",
    title: "Android & iOS App Development | OBERP",
    description:
      "OBERP develops Android and iOS apps for growing businesses, gyms, coaching institutes, and ERP workflows. Pricing is confirmed after a requirement meeting.",
    canonical: "app-development.html",
    h1: "App Development",
    h2: "Android and iOS apps that extend your website and ERP.",
    intro: "Mobile apps for daily business work",
    paragraphs: [
      "When a website is not enough, OBERP builds Android and iOS apps for staff, members, or customers. Apps work well for gyms, coaching centres, field teams, and ERP approvals.",
      "We map screens to your real process: attendance, fees, live class access, staff tasks, or inventory. The app can sit beside a dynamic website or a full ERP solution.",
      "Charges depend on platforms, logins, and integrations. Book a free consultation and we will recommend native or cross-platform delivery after the meeting."
    ],
    items: [
      { icon: "web.png", title: "Android apps", text: "Play Store ready apps for members, trainers, or internal staff." },
      { icon: "design.png", title: "iOS apps", text: "iPhone apps with the same workflow as your Android and web product." },
      { icon: "strategy.png", title: "ERP companion apps", text: "Mobile access to fees, attendance, branches, and notifications." },
      { icon: "brand.png", title: "Brand-led UI", text: "Your colours, logo, and tone so the app matches the business website." }
    ]
  },
  {
    file: "desktop-app.html",
    title: "Desktop App Creation | Windows Business Software | OBERP",
    description:
      "OBERP creates desktop apps for offices that need offline or local ERP tools, billing, and staff operations. Get a quote after a meeting.",
    canonical: "desktop-app.html",
    h1: "Desktop App Creation",
    h2: "Desktop software for offices that need local control.",
    intro: "When a desktop app is the right fit",
    paragraphs: [
      "Some businesses prefer a desktop app over a browser-only tool. OBERP creates desktop software for billing, inventory, branch operations, and staff work that must stay on office machines.",
      "Desktop app creation is useful for construction offices, coaching counters, and gyms that want fast local entry with later sync to an online business ERP.",
      "We confirm the Windows scope, data backup, and user roles in a meeting, then share charges based on modules."
    ],
    items: [
      { icon: "strategy.png", title: "Office workflows", text: "Counters, cashiers, and managers get screens built for daily use." },
      { icon: "web.png", title: "ERP modules on desktop", text: "Members, fees, stock, or project records without forcing every user onto a phone." },
      { icon: "research.png", title: "Local plus cloud", text: "Keep work available on site and connect to your online system when needed." },
      { icon: "design.png", title: "Training included in plan", text: "We walk your staff through the app after delivery is agreed." }
    ]
  },
  {
    file: "static-website.html",
    title: "Static Website Making | Business & School Sites | OBERP",
    description:
      "Need a static website for a business, school, gym, or coach? OBERP delivers fast brochure sites. Discuss free website making and custom pages after a consultation.",
    canonical: "static-website.html",
    h1: "Static Website",
    h2: "Fast static website making for brands that need a clear first presence.",
    intro: "What a static website includes",
    paragraphs: [
      "A static website is the right start for many online businesses: Home, About, Services, Portfolio, and Contact. Pages load quickly and are easy to rank when the copy is genuine.",
      "OBERP uses static website making for construction showcases, business branding profile pages, and school information sites that do not need logins.",
      "During a free consultation we explain starter versus custom work. Any free website making discussion is scoped honestly so you know what is included before we begin."
    ],
    items: [
      { icon: "design.png", title: "Brochure pages", text: "Home, services, gallery, and contact with your phone and email." },
      { icon: "web.png", title: "SEO basics", text: "Titles, descriptions, and headings aimed at website making and your city or niche." },
      { icon: "brand.png", title: "Brand profile", text: "A professional page that introduces the business without unused blog or team filler." },
      { icon: "strategy.png", title: "Upgrade path", text: "Move to a dynamic website or ERP when you need forms, fees, or staff logins." }
    ]
  },
  {
    file: "dynamic-website.html",
    title: "Dynamic Website Making | Admin & Login Sites | OBERP",
    description:
      "OBERP builds dynamic websites with admin panels, member logins, and enquiry workflows for gyms, coaching centres, schools, and businesses.",
    canonical: "dynamic-website.html",
    h1: "Dynamic Website",
    h2: "Dynamic website making for businesses that need control after launch.",
    intro: "When you need a dynamic website",
    paragraphs: [
      "A dynamic website lets you add pages, members, courses, or products without calling a developer for every change. It is the usual next step after a static site.",
      "OBERP builds dynamic websites for fitness brands, coaching institutes, and schools that collect registrations and fees. We can also discuss free dynamic website making starter scopes in the first meeting.",
      "If you later need branches, payroll, or inventory, we connect the site to an ERP solution instead of bolting on random plugins."
    ],
    items: [
      { icon: "web.png", title: "Admin panel", text: "Update services, banners, and leads from a simple dashboard." },
      { icon: "strategy.png", title: "Member or student logins", text: "Useful for gyms, coaching tests, and school notices." },
      { icon: "research.png", title: "Forms that reach email", text: "Enquiries go to admin@online-business-erp.com or your inbox." },
      { icon: "design.png", title: "SEO for changing content", text: "Clean URLs and titles so new pages can rank for online business search." }
    ]
  },
  {
    file: "erp-solution.html",
    title: "ERP Solution for Growing Business | OBERP",
    description:
      "OBERP specialises in ERP management solutions for gyms, coaching centres, and growing businesses. Custom modules. Charges after a requirement meeting.",
    canonical: "erp-solution.html",
    h1: "ERP Solution",
    h2: "Online Business ERP that matches how your company actually works.",
    intro: "ERP management, not a generic spreadsheet",
    paragraphs: [
      "OBERP means Online Business ERP. We specialise in ERP management solutions: branches, staff, customers, fees, inventory, and reports in one system.",
      "Our live fitness product covers company and branch setup, members, employees, equipment, expenses, and cash receipts. The same approach extends to coaching (tests, live classes, staff, student fees) and other industries.",
      "We do not publish a fake monthly price. A free ERP solution conversation means we listen first, then quote the modules you need after the meeting."
    ],
    items: [
      { icon: "strategy.png", title: "Operations in one place", text: "Members, staff, fees, and expenses instead of separate diaries." },
      { icon: "web.png", title: "Web plus app plus desktop", text: "Use the ERP in the browser and add Android, iOS, or desktop access later." },
      { icon: "research.png", title: "Role-based access", text: "Owners see every branch; managers see only assigned locations." },
      { icon: "brand.png", title: "Industry templates", text: "Fitness, coaching, school, and construction starting points you can still customise." }
    ]
  }
];

const projects = [
  {
    file: "project-fitness-freaks.html",
    title: "Fitness Freaks Gym ERP | Fitness Website Case | OBERP",
    description:
      "Fitness Freaks is OBERP's gym ERP and fitness website work: branches, members, employees, equipment, expenses, and cash receipts. Visit fitnessfreaks.biz.",
    canonical: "project-fitness-freaks.html",
    h1: "Fitness Freaks",
    about:
      "Fitness Freaks is a gym operations product and fitness website for multi-branch fitness businesses. Owners manage the company; managers work inside assigned branches. The system records members, employees, equipment, expenses, and cash payments with printable receipts.",
    client: "Fitness Freaks",
    category: "Fitness website & gym ERP",
    url: "https://fitnessfreaks.biz",
    urlLabel: "fitnessfreaks.biz",
    extra: {
      image: "1.jpg",
      points: [
        "Company and branch structure so a growing gym can add locations without losing control.",
        "Member and employee records, equipment tracking, expense entry, and cash-only payment receipts.",
        "Useful if you are searching for a fitness website, free fitness website consultation, or a full gym ERP instead of a brochure-only page."
      ]
    }
  },
  {
    file: "project-coaching.html",
    title: "Online Coaching Management System | OBERP",
    description:
      "OBERP coaching management software covers tests, live classes, staff management, and student fees for coaching websites and institutes.",
    canonical: "project-coaching.html",
    h1: "Online Coaching Management",
    about:
      "This coaching platform helps institutes run classes online and on site. Staff manage batches, students pay fees, teachers publish tests, and the office tracks live class attendance from one online business system.",
    client: "Coaching institutes",
    category: "Coaching website & ERP",
    url: "",
    urlLabel: "Custom coaching build",
    extra: {
      image: "2.jpg",
      points: [
        "Tests and results so students and parents can see progress without calling the front desk.",
        "Live classes, staff management, and student fees in the same product.",
        "Ask us about a coaching website or a free coaching website consultation if you only need a public site first."
      ]
    }
  },
  {
    file: "project-construction.html",
    title: "Construction Website Development | OBERP",
    description:
      "OBERP builds construction websites that show projects, services, and enquiry forms for builders and contractors. Pricing after a meeting.",
    canonical: "project-construction.html",
    h1: "Construction Website",
    about:
      "A construction website needs project photos, service lists, and a direct enquiry path. OBERP designs construction sites that present completed work and collect leads for the office team.",
    client: "Builders & contractors",
    category: "Construction website",
    url: "",
    urlLabel: "Custom construction site",
    extra: {
      image: "3.jpg",
      points: [
        "Project galleries, service pages, and contact details that work on mobile at a job site.",
        "Optional dynamic updates so you can add new buildings without editing code.",
        "Pair the public site with a later ERP if you need vendor bills or site-wise expenses."
      ]
    }
  },
  {
    file: "project-branding.html",
    title: "Business Branding Profile Website | OBERP",
    description:
      "OBERP creates business branding profile pages so companies can present services, proof, and contact details in a clean online business website.",
    canonical: "project-branding.html",
    h1: "Business Branding Profile",
    about:
      "A branding profile page is a focused business website: who you are, what you offer, selected work, and how to book a meeting. It is ideal when you need a professional presence without a large catalogue.",
    client: "Growing businesses",
    category: "Business website & branding",
    url: "",
    urlLabel: "Custom branding site",
    extra: {
      image: "4.jpg",
      points: [
        "Logo, colours, and copy aligned to your brand so the site feels like the company, not a leftover template.",
        "Useful for founders who searched for a business website or free business website consultation before investing in an ERP.",
        "We can expand the profile into a full dynamic website or ERP when operations need software, not only a page."
      ]
    }
  }
];

const about = page(
  {
    title: "About OBERP | Online Business ERP",
    description:
      "OBERP (Online Business ERP) helps growing businesses with website making, Android and iOS apps, desktop software, and ERP management solutions. Charges after a meeting.",
    canonical: "about.html"
  },
  `
${pageBanner("About OBERP")}
		<section class="about_page_area">
			<div class="container">
				<div class="row text-center">
					<div class="offset-lg-1 col-lg-10 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
						<div class="single_about_content">
							<h2>Online Business ERP for companies that are ready to grow.</h2>
							<p>OBERP stands for Online Business ERP. We provide software solutions for growing businesses: websites, mobile apps, desktop apps, and specialised ERP management systems. Whether you need a school website, a fitness website, a coaching website, or a full ERP, we start with your process and confirm charges after a meeting.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="feature_area section-padding">
			<div class="container">
				<div class="row text-center">
					<div class="col-lg-4 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
						<div class="single_feature">
							<img src="assets/img/icon/web.png" alt="Web development" />
							<h4>Web development</h4>
							<p>Static and dynamic website making for business, school, fitness, and coaching brands.</p>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
						<div class="single_feature">
							<img src="assets/img/icon/design.png" alt="App development" />
							<h4>App development</h4>
							<p>Android and iOS apps that extend your website or ERP to staff and customers.</p>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
						<div class="single_feature">
							<img src="assets/img/icon/strategy.png" alt="Desktop apps" />
							<h4>Desktop app creation</h4>
							<p>Office software for counters and teams that prefer a local desktop workflow.</p>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<div class="single_feature">
							<img src="assets/img/icon/research.png" alt="ERP solution" />
							<h4>ERP solution</h4>
							<p>Custom ERP management for gyms, coaching institutes, and multi-branch businesses.</p>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="0">
						<div class="single_feature">
							<img src="assets/img/icon/brand.png" alt="Business branding" />
							<h4>Business branding sites</h4>
							<p>Profile pages that introduce the company with clear services and contact details.</p>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s" data-wow-offset="0">
						<div class="single_feature">
							<img src="assets/img/icon/photo.png" alt="Free consultation" />
							<h4>Free consultation</h4>
							<p>We discuss free website making and ERP starter options, then quote after the meeting.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section data-stellar-background-ratio="0.3" class="counter_feature section-padding">
			<div class="container">
				<div class="row text-center">
					<div class="col-lg-3 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
						<div class="single-project">
							<img src="assets/img/icon/counter-1.png" alt="Services" />
							<h2 class="counter-num">6</h2>
							<h4>Core services</h4>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
						<div class="single-project">
							<img src="assets/img/icon/counter-2.png" alt="Industries" />
							<h2 class="counter-num">5</h2>
							<h4>Industries we serve</h4>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<div class="single-project">
							<img src="assets/img/icon/counter-3.png" alt="Custom ERP" />
							<h2 class="counter-num">1</h2>
							<h4>Focus: custom ERP</h4>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 col-xs-12 no-padding wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="0">
						<div class="single-project single-project-mrnone">
							<img src="assets/img/icon/counter-4.png" alt="Support" />
							<h2 class="counter-num">1</h2>
							<h4>Direct support line</h4>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="hire_us_area section-padding">
			<div class="container">
				<div class="row">
					<div class="offset-lg-1 col-lg-10 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
						<div class="row">
							<div class="col-lg-4 col-sm-6 col-xs-12">
								<div class="hire_img">
									<img src="assets/img/icon/search.png" class="img-fluid" alt="Contact OBERP" />
								</div>
							</div>
							<div class="col-lg-8 col-sm-6 col-xs-12">
								<div class="hire_content">
									<h2>Want to work with OBERP?</h2>
									<p>Tell us about your website, app, or ERP. We reply on email and phone, then confirm charges after the meeting.</p>
									<a class="btn_one" href="contact.html">Contact us</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
${contactBlock("Talk to OBERP")}`
);

const serviceList = page(
  {
    title: "Software Services | Web, App, Desktop & ERP | OBERP",
    description:
      "OBERP services: web development, Android and iOS app development, desktop app creation, static websites, dynamic websites, and ERP solutions for growing businesses.",
    canonical: "service.html"
  },
  `
${pageBanner("Our Services")}
		<section class="service_area section-padding">
			<div class="container">
				<div class="row text-center">
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
						<div class="single_service">
							<img src="assets/img/icon/web.png" alt="Web development" />
							<h4>Web development</h4>
							<p>Website making for business, school, fitness, coaching, and construction brands.</p>
							<a class="btn_one" href="web-development.html">More Info</a>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s" data-wow-offset="0">
						<div class="single_service">
							<img src="assets/img/icon/design.png" alt="App development" />
							<h4>App development</h4>
							<p>Android and iOS apps for members, staff, and customers connected to your ERP.</p>
							<a class="btn_one" href="app-development.html">More Info</a>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
						<div class="single_service">
							<img src="assets/img/icon/strategy.png" alt="Desktop app creation" />
							<h4>Desktop app creation</h4>
							<p>Windows desktop software for offices that need local billing and operations.</p>
							<a class="btn_one" href="desktop-app.html">More Info</a>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<div class="single_service">
							<img src="assets/img/icon/brand.png" alt="Static website" />
							<h4>Static website</h4>
							<p>Fast brochure sites and branding pages. Discuss free website making in consultation.</p>
							<a class="btn_one" href="static-website.html">More Info</a>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="0">
						<div class="single_service">
							<img src="assets/img/icon/research.png" alt="Dynamic website" />
							<h4>Dynamic website</h4>
							<p>Admin panels, logins, and content you can update. Ask about starter dynamic scopes.</p>
							<a class="btn_one" href="dynamic-website.html">More Info</a>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s" data-wow-offset="0">
						<div class="single_service">
							<img src="assets/img/icon/photo.png" alt="ERP solution" />
							<h4>ERP solution</h4>
							<p>Custom ERP management for gyms, coaching centres, and growing businesses.</p>
							<a class="btn_one" href="erp-solution.html">More Info</a>
						</div>
					</div>
				</div>
				<p class="text-center quote_note">Charges are decided from the requirement and confirmed after a meeting. Start with a free consultation.</p>
			</div>
		</section>
${contactBlock("Request a service quote")}`
);

const portfolio = page(
  {
    title: "Portfolio | Fitness, Coaching, Construction, Branding | OBERP",
    description:
      "OBERP portfolio: Fitness Freaks gym ERP, online coaching management, construction websites, and business branding profile pages.",
    canonical: "portfolio.html"
  },
  `
${pageBanner("Our Projects")}
		<section class="portfolio_project_area section-padding">
			<div class="container">
				<div class="row">
				  <div class="col-lg-12 col-sm-12 col-xs-12">
					<div class="single_project">
						<img src="assets/img/portfolio/1.jpg" class="img-fluid" alt="Fitness Freaks gym ERP and fitness website" />
						<h1>01</h1>
						<h2>Fitness Freaks</h2>
						<p>A fitness website and gym ERP for multi-branch operations: members, employees, equipment, expenses, and cash receipts. Live at fitnessfreaks.biz.</p>
						<a class="btn_one" href="project-fitness-freaks.html">View Project</a>
					</div>
				  </div>
				  <div class="col-lg-12 col-sm-12 col-xs-12">
					<div class="single_project">
						<img src="assets/img/portfolio/2.jpg" class="img-fluid" alt="Online coaching management system" />
						<h1>02</h1>
						<h2>Online coaching management</h2>
						<p>Coaching website and operations software with tests, live classes, staff management, and student fees.</p>
						<a class="btn_one" href="project-coaching.html">View Project</a>
					</div>
				  </div>
				  <div class="col-lg-12 col-sm-12 col-xs-12">
					<div class="single_project">
						<img src="assets/img/portfolio/3.jpg" class="img-fluid" alt="Construction website by OBERP" />
						<h1>03</h1>
						<h2>Construction website</h2>
						<p>A construction website that presents projects, services, and enquiries for builders and contractors.</p>
						<a class="btn_one" href="project-construction.html">View Project</a>
					</div>
				  </div>
				  <div class="col-lg-12 col-sm-12 col-xs-12">
					<div class="single_project">
						<img src="assets/img/portfolio/4.jpg" class="img-fluid" alt="Business branding profile website" />
						<h1>04</h1>
						<h2>Business branding profile</h2>
						<p>A focused business website for branding: story, services, selected work, and a meeting request.</p>
						<a class="btn_one" href="project-branding.html">View Project</a>
					</div>
				  </div>
				</div>
			</div>
		</section>`
);

const contact = page(
  {
    title: "Contact OBERP | Email & Phone for Website or ERP",
    description:
      "Contact OBERP for website making, apps, and ERP solutions. Email admin@online-business-erp.com or call +91 78983 56505. Free consultation, charges after meeting.",
    canonical: "contact.html"
  },
  `
${pageBanner("Let's Talk")}
		<section class="address_area section-padding">
			<div class="container">
				<div class="row justify-content-center">
				  <div class="col-lg-6 col-sm-8 col-xs-12 text-center">
					<div class="single_address">
						<h4>OBERP support</h4>
						<p class="mr_20">Online Business ERP<br />India-based remote delivery</p>
						<p><a href="tel:+917898356505">+91 78983 56505</a></p>
						<p><a href="mailto:admin@online-business-erp.com">admin@online-business-erp.com</a></p>
					</div>
				  </div>
				</div>
			</div>
		</section>
${contactBlock("Send a project brief")}`
);

const pricing = page(
  {
    title: "Pricing | Quote After Meeting | OBERP",
    description:
      "OBERP does not publish fixed website or ERP prices. Charges depend on requirement and are confirmed after a meeting. Book a free consultation.",
    canonical: "pricing.html"
  },
  `
${pageBanner("Pricing")}
		<div class="pricing_page section-padding">
			<div class="container">
				<div class="section-title text-center">
					<h2>Charges after we understand the work</h2>
					<p>Every website, app, and ERP has a different scope. We book a free consultation, then confirm charges in a meeting.</p>
				</div>
				<div class="row">
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
						<div class="pricingTable blue">
							<div class="pricingTable-header">
								<div class="price-value">
									<span class="amount" style="font-size:28px;">Quote</span>
									<span class="duration">after meeting</span>
								</div>
							</div>
							<div class="pricing-content">
								<h3 class="title">Websites</h3>
								<ul>
									<li>Static website</li>
									<li>Dynamic website</li>
									<li>Business, school, fitness, coaching</li>
									<li>Construction and branding pages</li>
									<li>Free consultation on starter scope</li>
								</ul>
							</div>
							<div class="pricingTable-signup">
								<a href="contact.html">Book a meeting</a>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
						<div class="pricingTable blue">
							<div class="pricingTable-header">
								<div class="price-value">
									<span class="amount" style="font-size:28px;">Quote</span>
									<span class="duration">after meeting</span>
								</div>
							</div>
							<div class="pricing-content">
								<h3 class="title">Apps</h3>
								<ul>
									<li>Android app</li>
									<li>iOS app</li>
									<li>Desktop app creation</li>
									<li>Staff and member logins</li>
									<li>ERP companion apps</li>
								</ul>
							</div>
							<div class="pricingTable-signup">
								<a href="contact.html">Book a meeting</a>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" data-wow-offset="0">
						<div class="pricingTable blue">
							<div class="pricingTable-header">
								<div class="price-value">
									<span class="amount" style="font-size:28px;">Quote</span>
									<span class="duration">after meeting</span>
								</div>
							</div>
							<div class="pricing-content">
								<h3 class="title">ERP solution</h3>
								<ul>
									<li>Gym and fitness ERP</li>
									<li>Coaching management</li>
									<li>Fees, staff, and branches</li>
									<li>Custom modules</li>
									<li>Honest starter vs full build</li>
								</ul>
							</div>
							<div class="pricingTable-signup">
								<a href="contact.html">Book a meeting</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does OBERP mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OBERP stands for Online Business ERP. We build websites, mobile apps, desktop apps, and ERP management solutions for growing businesses."
      }
    },
    {
      "@type": "Question",
      name: "Do you offer free website making?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a free consultation and can discuss starter or free website making options. A complete custom website or ERP is quoted after a meeting based on your requirement."
      }
    },
    {
      "@type": "Question",
      name: "What is the difference between a static website and a dynamic website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A static website is a fast brochure site. A dynamic website includes an admin panel, logins, or content you update yourself. OBERP builds both."
      }
    },
    {
      "@type": "Question",
      name: "How does OBERP price an ERP solution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Charges depend on modules such as members, fees, staff, branches, and apps. We confirm the price after a requirement meeting."
      }
    }
  ]
};

const faqHead = head({
  title: "FAQ | Website Making, ERP & Apps | OBERP",
  description:
    "Answers about OBERP website making, static vs dynamic sites, Android and iOS apps, desktop software, ERP pricing, and fitness or coaching websites.",
  canonical: "faq.html"
}).replace(
  "</head>",
  `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n\t</head>`
);

const faq = `${faqHead}
${nav()}
${pageBanner("Frequently Asked Questions")}
		<section id="faq" class="faq1-area">
			<div class="container">
				<div class="section-title text-center">
					<h2>Questions buyers ask before a meeting</h2>
					<p>Clear answers on website making, apps, and ERP solutions. Book a free consultation when you are ready.</p>
				</div>
				<div class="row">
					<div class="col-lg-10 offset-lg-1 col-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
                    <div class="faq-tab-content">
                            <div class="faq_tab" id="accordion_1">
                                <div class="card active">
                                    <div class="card-header" id="headingOne">
                                        <h5 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true">What does OBERP mean?</button></h5>
                                    </div>
                                    <div id="collapseOne" class="collapse show" data-parent="#accordion_1">
                                        <div class="card-body">OBERP stands for Online Business ERP. We provide software solutions for growing businesses: website making, Android and iOS apps, desktop app creation, and ERP management systems.</div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h5 class="mb-0"><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo">Do you offer free website making?</button></h5>
                                    </div>
                                    <div id="collapseTwo" class="collapse" data-parent="#accordion_1">
                                        <div class="card-body">The first consultation is free. We can talk through free website making or starter scopes. A finished custom website, dynamic website, or ERP is priced after we see the requirement in a meeting.</div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingThree">
                                        <h5 class="mb-0"><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree">Static website or dynamic website?</button></h5>
                                    </div>
                                    <div id="collapseThree" class="collapse" data-parent="#accordion_1">
                                        <div class="card-body">Choose a static website for a fast business, school, or construction brochure. Choose a dynamic website when you need logins, admin updates, or student and member records.</div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingFour">
                                        <h5 class="mb-0"><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour">Can you build a fitness or coaching website?</button></h5>
                                    </div>
                                    <div id="collapseFour" class="collapse" data-parent="#accordion_1">
                                        <div class="card-body">Yes. Fitness Freaks is our gym ERP and fitness website example. We also build coaching websites with tests, live classes, staff management, and student fees.</div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingFive">
                                        <h5 class="mb-0"><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive">Do you build Android, iOS, and desktop apps?</button></h5>
                                    </div>
                                    <div id="collapseFive" class="collapse" data-parent="#accordion_1">
                                        <div class="card-body">Yes. App development covers Android and iOS. Desktop app creation is for offices that want local software connected to the same ERP data.</div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingSix">
                                        <h5 class="mb-0"><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix">How do charges work?</button></h5>
                                    </div>
                                    <div id="collapseSix" class="collapse" data-parent="#accordion_1">
                                        <div class="card-body">Charges depend on pages, modules, and platforms. We never show a fake monthly price. You get a quote after the meeting.</div>
                                    </div>
                                </div>
                            </div>
                    </div>
					</div>
				</div>
			</div>
		</section>
${contactBlock("Still have a question?")}
${footer()}
${scripts()}`;

const notFound = page(
  {
    title: "Page not found | OBERP",
    description: "The OBERP page you requested is not available. Return home for website making, apps, and ERP solutions.",
    canonical: "404.html"
  },
  `
${pageBanner("Page not found")}
		<section class="zero_area section-padding">
			<div class="container">
				<div class="row">
				  <div class="col-lg-12 col-sm-12 col-xs-12 text-center">
						<div class="error_page">
							<img src="assets/img/error.png" class="img-fluid" alt="404 error" />
							<p class="quote_note">This URL is not part of the OBERP site. Continue to website making, services, or contact.</p>
							<a class="btn_one" href="index.html">Back to home</a>
						</div>
				  </div>
				</div>
			</div>
		</section>`
);

const files = {
  "about.html": about,
  "service.html": serviceList,
  "portfolio.html": portfolio,
  "contact.html": contact,
  "pricing.html": pricing,
  "faq.html": faq,
  "404.html": notFound
};

services.forEach((s) => {
  files[s.file] = page(
    { title: s.title, description: s.description, canonical: s.canonical },
    serviceDetail(s)
  );
});

projects.forEach((p) => {
  files[p.file] = page(
    { title: p.title, description: p.description, canonical: p.canonical },
    projectDetail(p)
  );
});

Object.entries(files).forEach(([name, html]) => {
  fs.writeFileSync(path.join(ROOT, name), html);
  console.log("wrote", name);
});
