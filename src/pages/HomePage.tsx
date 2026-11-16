import HeroPopTrio from "@/components/sections/hero/HeroPopTrio";
import TeamTiltedCrew from "@/components/sections/team/TeamTiltedCrew";
import MenuGinghamCards from "@/components/sections/menu/MenuGinghamCards";
import ProductStickerShelf from "@/components/sections/product/ProductStickerShelf";
import TestimonialBubbleCarousel from "@/components/sections/testimonial/TestimonialBubbleCarousel";
import FaqPopRows from "@/components/sections/faq/FaqPopRows";
import LoaderStackLayers from "@/components/loaders/LoaderStackLayers";

export default function HomePage() {
  return (
    <>
      <LoaderStackLayers
        label="Pressing fresh corn tortillas..."
      />

      <div id="menu" data-webild-section="HeroPopTrio" data-webild-section-id="HeroPopTrio-1" data-section="menu">
        <HeroPopTrio
          label="Richmond, TX"
          title="Fresh Street Tacos"
          description="Handmade corn tortillas, tender carne asada, and slow-cooked quesabirria served daily in Richmond, TX."
          cta={{
            text: "Explore Menu",
            href: "#menu-gingham-cards"
          }}
          introDelay={1.1}
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/delicious-tacos-arrangement_23-2150878193.jpg",
              imageAlt: "close up of fresh street tacos"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/mexican-food_23-2148024802.jpg",
              imageAlt: "tacos on a black plate"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/tasty-mexican-food_23-2148140284.jpg",
              imageAlt: "steaming taco on a plate"
            }
          ]}
          sticker={{
            imageSrc: "https://img.b2bpic.net/free-photo/young-people-enjoying-street-food_23-2151525827.jpg",
            imageAlt: "tacos served on a plate"
          }}
        />
      </div>

      <div id="team-tilted-crew" data-webild-section="TeamTiltedCrew" data-webild-section-id="TeamTiltedCrew-1" data-section="team-tilted-crew">
        <TeamTiltedCrew
          label="Our Team"
          title="Meet Our Cooks"
          ariaLabel="Team members of Authentic Taco House"
          members={[
            {
              name: "Jessica Graham",
              role: "Head Chef",
              imageSrc: "https://img.b2bpic.net/free-photo/cook-woman-cooking-fish_1398-246.jpg",
              imageAlt: "Cook woman  cooking fish"
            },
            {
              name: "Daniel Turner",
              role: "Grill Master",
              imageSrc: "https://img.b2bpic.net/free-photo/man-with-ginger-beard-apron-gloves-holding-meat-knife_273609-20969.jpg",
              imageAlt: "Man with ginger beard in apron and gloves holding meat and knife"
            },
            {
              name: "Olivia Henderson",
              role: "Tortilla Maker",
              imageSrc: "https://img.b2bpic.net/free-photo/high-angle-hands-rolling-out-dough_23-2149452275.jpg",
              imageAlt: "High angle hands rolling out the dough"
            },
            {
              name: "Caleb Morales",
              role: "Kitchen Lead",
              imageSrc: "https://img.b2bpic.net/free-photo/male-chef-kitchen-cooking_23-2148934659.jpg",
              imageAlt: "Male chef in kitchen cooking"
            },
            {
              name: "Molly Okafor",
              role: "Service Manager",
              imageSrc: "https://img.b2bpic.net/free-photo/enthusiastic-young-asian-woman-cafe-manager-demonstrating-app-mobile-phone-showing-smartphone-scr_1258-124861.jpg",
              imageAlt: "Enthusiastic young asian woman cafe manager demonstrating app on mobile phone showing smartphone scr"
            },
            {
              name: "Ethan Kelly",
              role: "Sous Chef",
              imageSrc: "https://img.b2bpic.net/free-photo/chef-kitchen-cooking_23-2148471873.jpg",
              imageAlt: "Chef in kitchen cooking"
            }
          ]}
        />
      </div>

      <div id="menu-gingham-cards" data-webild-section="MenuGinghamCards" data-webild-section-id="MenuGinghamCards-1" data-section="menu-gingham-cards">
        <MenuGinghamCards
          label="Fresh Menu"
          title="Richmond Favorites"
          itemsLabel="items"
          categories={[
            {
              title: "Signature Tacos",
              items: [
                {
                  name: "Quesabirria Tacos",
                  price: "$14",
                  description: "Consomé broth with melted cheese and slow-cooked beef birria.",
                  tag: "Popular",
                  imageSrc: "https://img.b2bpic.net/free-photo/mexican-quesadilla-sliced-with-vegetables-sauces-table_2829-8409.jpg",
                  imageAlt: "tacos on plate with sauce bowl"
                },
                {
                  name: "Carne Asada Tacos",
                  price: "$12",
                  description: "Grilled steak on fresh homemade corn tortillas with cilantro and onion.",
                  tag: "Local Favorite",
                  imageSrc: "https://img.b2bpic.net/free-photo/delicious-traditional-tacos-arrangement_23-2150799541.jpg",
                  imageAlt: "three delicious chicken tacos on plate"
                },
                {
                  name: "Loaded Nachos",
                  price: "$11",
                  description: "Crispy tortilla chips topped with guacamole, beans, queso, and jalapeños.",
                  tag: "House Special",
                  imageSrc: "https://img.b2bpic.net/free-photo/delicious-nachos-near-salad-vegetables-herbs_23-2148132042.jpg",
                  imageAlt: "Delicious nachos near salad among vegetables and herbs"
                },
                {
                  name: "Al Pastor Tacos",
                  price: "$12",
                  description: "Marinated pork roasted with pineapple on homemade corn tortillas.",
                  tag: "Popular",
                  imageSrc: "https://img.b2bpic.net/free-photo/mexican-nachos-tortilla-chips-with-black-beans-guacamole-tomato-jalapeno-wooden-table_123827-20487.jpg",
                  imageAlt: "nachos with guacamole and beans"
                }
              ]
            },
            {
              title: "Sides & Extras",
              items: [
                {
                  name: "Homemade Menudo",
                  price: "$13",
                  description: "Traditional tripe soup with red chili pepper broth and fresh oregano.",
                  tag: "Weekend Dish"
                },
                {
                  name: "Cheesy Quesadilla",
                  price: "$9",
                  description: "Warm flour tortilla filled with melted cheese and your choice of meat."
                },
                {
                  name: "Fresh Chips & Salsa",
                  price: "$5",
                  description: "House-made tortilla chips with freshly prepared roasted tomato salsa."
                }
              ]
            }
          ]}
        />
      </div>

      <div id="product-sticker-shelf" data-webild-section="ProductStickerShelf" data-webild-section-id="ProductStickerShelf-1" data-section="product-sticker-shelf">
        <ProductStickerShelf
          label="House Favorites"
          title="Richmond Tacos"
          description="Fresh street tacos made daily with warm homemade corn tortillas in Richmond."
          buyText="See Highlights"
          edges="both"
          items={[
            {
              name: "Carne Asada Tacos",
              description: "Grilled steak on homemade corn tortillas with fresh cilantro and onion.",
              imageSrc: "https://img.b2bpic.net/free-photo/delicious-tacos-arrangement_23-2150878181.jpg",
              imageAlt: "Delicious tacos arrangement",
              cutout: false,
              href: "#menu"
            },
            {
              name: "Quesabirria Tacos",
              description: "Crispy tortillas loaded with tender beef and rich melted cheese.",
              imageSrc: "https://img.b2bpic.net/free-photo/traditional-venezuelan-beef-cachapa-wooden-table_123827-23020.jpg",
              imageAlt: "Traditional Venezuelan beef cachapa on wooden table",
              cutout: false,
              href: "#menu"
            },
            {
              name: "Al Pastor Tacos",
              description: "Marinated pork topped with fresh sweet pineapple and green salsa.",
              imageSrc: "https://img.b2bpic.net/free-photo/delicious-tacos-arrangement_23-2150878201.jpg",
              imageAlt: "three pulled pork tacos on plate",
              cutout: false,
              href: "#menu"
            },
            {
              name: "Fajita Beef Tacos",
              description: "Tender fajita beef served with warm corn tortillas and salsa.",
              imageSrc: "https://img.b2bpic.net/free-photo/top-view-paper-tacos-arrangement_23-2148764301.jpg",
              imageAlt: "hand holding taco with red background",
              cutout: false,
              href: "#menu"
            }
          ]}
          topColor="var(--background)"
        />
      </div>

      <div id="testimonial-bubble-carousel" data-webild-section="TestimonialBubbleCarousel" data-webild-section-id="TestimonialBubbleCarousel-1" data-section="testimonial-bubble-carousel">
        <TestimonialBubbleCarousel
          label="Customer Stories"
          title="What Richmond Says"
          items={[
            {
              quote: "The absolute best quesabirria tacos in Richmond! The dipping broth is so rich, and the homemade corn tortillas make all the difference.",
              name: "Ethan Kelly",
              source: "Google Review"
            },
            {
              quote: "Generous portions and reasonable prices. Their carne asada street tacos are super flavorful and always served fresh by friendly staff.",
              name: "Molly Okafor",
              source: "Local Diner"
            },
            {
              quote: "We come here every week for the fajita tacos. Warm service, authentic recipes, and delicious salsa every single time!",
              name: "Caleb Morales",
              source: "Tripadvisor"
            },
            {
              quote: "Hands down the best taco spot on Minonite Road. Fast, attentive team and warm corn tortillas that taste homemade.",
              name: "Olivia Henderson",
              source: "Google Review"
            },
            {
              quote: "Great atmosphere for quick family dinners. The al pastor is full of flavor and the portion sizes are huge for the price.",
              name: "Daniel Turner",
              source: "Local Guide"
            }
          ]}
          ariaLabel="Customer testimonials"
        />
      </div>

      <div id="faq-pop-rows" data-webild-section="FaqPopRows" data-webild-section-id="FaqPopRows-1" data-section="faq-pop-rows">
        <FaqPopRows
          label="Good to know"
          title="Planning your visit"
          items={[
            {
              question: "Where are you located?",
              answer: "We are located at 1622 Minonite Rd, Richmond, TX 77469."
            },
            {
              question: "What are your daily opening hours?",
              answer: "We are open daily and close at 9:00 PM."
            },
            {
              question: "Do you make fresh corn tortillas in-house?",
              answer: "Yes, our corn tortillas are handmade fresh daily right in our kitchen."
            },
            {
              question: "What are the most popular menu items?",
              answer: "Our guests love our quesabirria, carne asada street tacos, and homemade nachos."
            },
            {
              question: "What is the typical cost per person?",
              answer: "Most guests spend between $10 and $20 per person for a full meal."
            }
          ]}
          edges="both"
          ariaLabel="Frequently asked questions"
          topColor="var(--background)"
        />
      </div>
    </>
  );
}
