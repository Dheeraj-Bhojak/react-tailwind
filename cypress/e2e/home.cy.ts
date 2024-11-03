/// <reference types="cypress" />
describe("Test Home", () => {
  const heroImg = "/static/media/hero.308317785705ca80cdca.png";
  const stats = [
    { id: 1, name: "Influencers", value: "1 million +" },
    { id: 2, name: "Social Channels", value: "4" },
    { id: 3, name: "companies", value: "46,000 +" },
  ];
  const featuresArray: {
    id: number;
    title: string;
    description: string;
    svg_d: string;
    viewBox: string;
  }[] = [
    {
      id: 1,
      title: "Support 24/7",
      viewBox: "0 0 512 512",
      description:
        " Minus fuga aliquid vero facere ducimus quos, quisquam nemo? Molestias ullam provident vitae error aliquam dolorum temporibus? Doloremque, quasi",
      svg_d:
        "M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z",
    },
    {
      id: 2,
      title: "Safe and solid",
      viewBox: "0 0 512 512",
      description:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut consequatur quod fugit rem. Quisquam debitis odit illum, architecto dolorem fugit voluptas. Dolor!",
      svg_d:
        "M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z",
    },
    {
      id: 3,
      title: "Extremely fast",
      viewBox: "0 0 640 512",
      description:
        "amet placeat aliquam accusamus officia modi odio vero sunt officiis odit illum qui error quos veniam fugit facere assumenda ipsam, deleniti voluptate distinctio saepe. Maxime dolor ea quibusdam aperiam recusandae laudantium consequatur, nulla rerum hic aspernatur cumque officia ullam odio eveniet. Cupiditate, odit est.",
      svg_d:
        "M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z",
    },
    {
      id: 4,
      title: "Live analytics",
      viewBox: "0 0 544 512",
      description:
        "magni qui rerum dignissimos maxime ullam nemo? Similique ex aut soluta blanditiis",
      svg_d:
        "M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z",
    },
  ];
  const teamsArray: {
    id: number;
    name: string;
    imgUrl: string;
    profession: string;
  }[] = [
    {
      id: 1,
      imgUrl:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
      name: "dany Bailey",
      profession: "Software Engineer",
    },
    {
      id: 2,
      imgUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
      name: "lucy carter",
      profession: "Graphic Designer",
    },
    {
      id: 3,
      imgUrl:
        "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80",
      name: "Jade Bradley",
      profession: "Dev Ops",
    },
    {
      id: 4,
      imgUrl:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
      name: "dany Bailey",
      profession: "Software Engineer",
    },
    {
      id: 5,
      imgUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
      name: "lucy carter",
      profession: "Graphic Designer",
    },
    {
      id: 6,
      imgUrl:
        "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80",
      name: "Jade Bradley",
      profession: "Dev Ops",
    },
  ];
  const SubscriptionList = [
    {
      id: 1,
      title: "first Pack",
      price: 5,
      planDetails: ["Lorem ipsum", "Dolor sit amet`"],
      styles: "md:my-6",
    },
    {
      id: 2,
      title: "second Pack",
      price: 15,
      planDetails: [
        "Lorem ipsum",
        "Dolor sit amet`",
        " Consectetur",
        " Adipisicing",
      ],
      styles: " md:relative md:z-50 md:-mx-3 md:mb-0",
    },
    {
      id: 3,
      title: "third Pack",
      price: 35,
      planDetails: [
        "Lorem ipsum",
        " Dolor sit amet",
        " Consectetur",
        " Adipisicing",
        "Elit repellat",
        " Much more",
      ],
      styles: "md:my-6",
    },
  ];

  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900); // Set viewport to desktop size
  });
  it("Test navigation bars", () => {
    cy.title().should("eq", "Rock-Influencer"); //check if title is display
    cy.contains("Rock Influencer").should("be.visible"); // check if the nav bar logo is visible
  });

  it("should navigate to the correct page when a menu item is clicked", () => {
    cy.get("nav").within(() => {
      cy.contains("About").click();
    });
    cy.url().should("include", "/about");
  });

  it('should navigate to the login page when "Sign In" is clicked', () => {
    cy.get("nav").contains("Sign In").click();
    cy.url().should("include", "login");
  });

  it('should navigate to the registration page when "Sign Up" is clicked', () => {
    cy.get("nav").contains("Sign Up").click();
    cy.url().should("include", "register");
  });

  it("Test navigation bars", () => {
    cy.get("nav").should("be.visible"); // Ensure the menu is visible

    cy.get("nav h1.logo").should("have.text", "Rock Influencer");
    cy.get("nav ul").within(() => {
      cy.contains("About").click();
      cy.url().should("include", "/about"); // Assert that the URL contains the about page path
    });
    cy.get("nav ul").within(() => {
      cy.contains("Services").click();
      cy.url().should("include", "/services"); //Assert that the URL contains the services page path
    });
    cy.get("nav ul").within(() => {
      cy.contains("Pricing").click();
      cy.url().should("include", "/pricing"); // Assert that the URL contains the proicing page path
    });

    cy.get("nav ul").within(() => {
      cy.contains("Contact").click();
      cy.url().should("include", "/contact"); // Assert that the URL contains the contact page path
    });

    cy.get("nav ul").within(() => {
      cy.contains("Home").click();
      cy.url().should("include", "/"); // Assert that the URL contains the home page path
    });
  });
  it("should toggle the menu when the hamburger button is clicked", () => {
    cy.viewport(1023, 900); // Set viewport to desktop size
    cy.get(".navbar-burger").click();
    cy.get(".hidden").should("have.class", "flex");
    cy.get(".navbar-burger").click();
    cy.get(".hidden").should("not.have.class", "flex");
  });

  it("should navigate to the correct page when a menu item is clicked", () => {
    cy.get("nav").within(() => {
      cy.contains("About").click();
    });
    cy.url().should("include", "/home/about");
  });

  it('should navigate to the login page when "Sign In" or "Sign Up is clicked', () => {
    cy.get("nav").within(() => {
      cy.contains("Sign In").click();
      cy.url().should("include", "/home/login");
      cy.contains("Sign Up").click();
      cy.url().should("include", "/home/register");
    });
  });

  it("Test home page hero contants", () => {
    cy.get("div.hero h1").should(
      "have.text",
      "Find The Best Influencer For Your Business"
    ); //displays the main heading'

    cy.get("div.hero p").should(
      "have.text",
      "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua commodo"
    ); //displays the subheading

    cy.get("div.hero a")
      .contains("Get A Free Trial")
      .trigger("mouseover") // Trigger the mouseover event to simulate hovering over the button
      .should("have.css", "background-color", "rgb(252, 211, 77)"); // Check if the button's background color is yellow
    //contains a link to get a free trial

    cy.get("div.hero img")
      .should("have.attr", "alt", "Hero Illustration")
      .and("have.attr", "src") // Replace 'heroImg' with the actual image source
      .and("include", heroImg); // Display the hero image
  });

  it("displays the statistics correctly", () => {
    cy.get(".stats") // Assuming the component has a class of "stats"
      .should("exist");

    cy.get(".stats .text-gray-900") // Assuming the statistic values have a class of "text-gray-900"
      .should("have.length", 3) // Assuming there are 3 statistics
      .each(($statValue, index) => {
        const expectedValue = stats[index].value;
        cy.wrap($statValue).should("contain.text", expectedValue);
      });

    cy.get(".stats .a-social_block") // Assuming the social media icons have a class of "a-social_block"
      .should("exist");
  });

  it("displays the team members section correctly", () => {
    cy.get(".teams") // Assuming the section has a class of "teams"
      .should("exist");

    cy.get(".teams .w-full") // Assuming each team member div has a class of "w-full"
      .should("have.length", teamsArray.length); // Check if the correct number of team members is displayed
  });

  it("displays correct information and images for each team member", () => {
    cy.get(".teams .w-full") // Assuming each team member div has a class of "w-full"
      .each(($member, index) => {
        const teamMember = teamsArray[index]; // Get the corresponding team member from the array

        cy.wrap($member).within(() => {
          cy.get("img").should("have.attr", "src", teamMember.imgUrl);

          cy.get(".text-xl").should("contain.text", teamMember.name);

          cy.get(".text-base").should("contain.text", teamMember.profession);
        });
      });
  });

  it("displays the features section correctly", () => {
    cy.get(".text-gray-800") // Assuming the section has a class of "text-gray-800"
      .should("exist");

    cy.get(".text-gray-800 h2").should("have.text", "Why is it so great?");

    cy.get(".text-gray-800 p.mb-12").should(
      "have.text",
      "Minus fuga aliquid vero facere ducimus quos, quisquam nemo? Molestias ullam provident vitae error aliquam dolorum temporibus? Doloremque, quasi"
    );

    cy.get(".text-gray-800 .grid") // Assuming the features grid has a class of "grid"
      .should("exist");

    cy.get(".text-gray-800 .grid > div") // Assuming each feature div is a direct child of the grid
      .should("have.length", featuresArray.length); // Check if the correct number of features is displayed
  });

  it("displays correct information and icons for each feature", () => {
    cy.get(".text-gray-800 .grid > div") // Assuming each feature div is a direct child of the grid
      .each(($feature, index) => {
        const feature = featuresArray[index]; // Get the corresponding feature from the array

        cy.wrap($feature).within(() => {
          cy.get("h5").should("have.text", feature.title);

          cy.get("p").should("have.text", feature.description);

          cy.get("svg")
            .should("have.attr", "viewBox", feature.viewBox)
            .should(
              "have.html",
              `<path fill="currentColor" d="${feature.svg_d}"></path>`
            );
        });
      });
  });

  it("displays pricing information correctly", () => {
    cy.get(".pricing h1").should("have.text", "Pricing");
    cy.get(".pricing-text").should(
      "have.text",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit repellat dignissimos laboriosam odit accusamus porro"
    );

    // Check each subscription card
    cy.get(".w-full.md\\:w-1\\/3")
      .should("have.length", 3)
      .each((card, index) => {
        cy.wrap(card).within(() => {
          // Check the title
          cy.get("h2").should("have.text", SubscriptionList[index].title);

          // Check the price
          cy.get("h3").should(
            "have.text",
            `$${SubscriptionList[index].price}/mo`
          );

          // Check the plan details
          const planDetails = SubscriptionList[index].planDetails;
          cy.get("ul").within(() => {
            cy.get("li")
              .should("have.length", planDetails.length)
              .each((item, idx) => {
                cy.wrap(item).should("contain.text", planDetails[idx]);
              });
          });

          // Check the "Buy Now" button
          cy.contains("Buy Now").should("be.visible");
        });
      });
  });

  it('redirects to the home page when "Buy Now" button is clicked', () => {
    cy.get(".w-full.md\\:w-1\\/3")
      .first()
      .within(() => {
        cy.get("button").click();
      });
  });
});
