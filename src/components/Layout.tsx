import { Outlet } from "react-router-dom";
import NavbarPillMenu from "@/components/navbars/NavbarPillMenu";
import FooterJuggleWordmark from "@/components/sections/footer/FooterJuggleWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="blob" data-card="panel" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarPillMenu
          brand="Authentic Taco House"
          navItems={[
            {
              name: "Menu",
              href: "#menu-gingham-cards"
            },
            {
              name: "Our Crew",
              href: "#team-tilted-crew"
            },
            {
              name: "Reviews",
              href: "#testimonial-bubble-carousel"
            },
            {
              name: "Visit Us",
              href: "#faq-pop-rows"
            }
          ]}
          cta={{
            text: "Get Directions",
            href: "#faq-pop-rows"
          }}
          note="Fresh street tacos & homemade corn tortillas in Richmond, TX"
        />
      </header>
      <main className="flex-grow" data-button="blob" data-card="panel" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterJuggleWordmark
          brand="Authentic Taco House"
          links={[
            {
              text: "Menu",
              href: "#menu"
            },
            {
              text: "Popular Dishes",
              href: "#product-sticker-shelf"
            },
            {
              text: "FAQ",
              href: "#faq-pop-rows"
            },
            {
              text: "Visit Us",
              href: "#faq-pop-rows"
            }
          ]}
          copyright="© 2026 Authentic Taco House. All rights reserved."
          tagline="Fresh street tacos, quesabirria, and homemade corn tortillas in Richmond, TX."
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/young-people-enjoying-street-food_23-2151525827.jpg?_wi=2",
              imageAlt: "Fresh street tacos served on a plate"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/mexican-food_23-2148024802.jpg?_wi=2",
              imageAlt: "Quesabirria tacos served on a plate"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/mexican-quesadilla-sliced-with-vegetables-sauces-table_2829-8409.jpg?_wi=2",
              imageAlt: "Authentic tacos served with salsa bowl"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/delicious-tacos-arrangement_23-2150878193.jpg?_wi=2",
              imageAlt: "Close up of hot carne asada street tacos"
            }
          ]}
        />
      </footer>
    </div>
  );
}
