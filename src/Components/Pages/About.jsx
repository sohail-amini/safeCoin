import React from "react";
// About section
export const About = () => {
  return (
    <div className="dark:text-white">
      <b className="text-bold">SafeCoin</b> is a dedicated trading service
      committed to providing our VIP Members with a secure, user-friendly, and
      efficient channel for earning cryptocurrencies. Since our establishment in
      2014, SafeCoin has been at the forefront of offering a safe investment
      environment and secure payment solutions using Bitcoin as the base
      currency. <br /> <br />
      Ensuring the trust of our members is our topmost priority. SafeCoin does
      not engage in product generation or interfere with our VIP members'
      transactions. Instead, we offer a service that enables our VIP members to
      invest in Bitcoin securely and earn annual returns on their investments
      Anonymous rights and privileges are extended to all VIP members, allowing
      for transfers and transactions conducted solely with usernames. We place
      great emphasis on user privacy, providing a service that can be utilized
      with utmost confidence.
      <br /> <br />
      <h2 className="text-md font-bold">
        Here's a simplified overview of how SafeCoin operates:
      </h2>
      First, our members purchase Bitcoin from an exchange service. They can
      then invest their Bitcoin in various VIP investment categories to start
      earning returns based on their investments. Alternatively, members can
      recharge their SafeCoin account balance with Bitcoin to ensure the
      anonymity of their crypto transactions. <br /> <br />
      Withdrawing funds from the SafeCoin account balance is a straightforward
      process. Members can withdraw funds to their registered Bitcoin wallet
      address at any time. It's important to note that wallet changes require
      the Secure Key provided during registration. <br /> <br />
      <b>
        {" "}
        SafeCoin operates with transparency in its profit-making activities:{" "}
      </b>
      <ol className="list-decimal px-6 py-2 space-y-2">
        <li>
          The majority of our profits are derived from trading the funds
          invested by our VIP members. These funds are utilized in the open
          market to generate interest income, and a portion of the profits is
          distributed back to each VIP member's account based on their
          investments.
        </li>
        <li>
          Additionally, we charge a 1% handling fee on Bitcoin transfers and
          eChecks processed through our services.
        </li>
      </ol>
      <br />
      please don't hesitate to contact us via email at:
      <b className="text-bold block">info@safecoin.com</b>
    </div>
  );
};
