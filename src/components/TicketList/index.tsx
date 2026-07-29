import { TicketOnEvent } from "@venuecms/sdk-next";
import { useFormatter } from "next-intl";

import { Link } from "@/lib/i18n";

export const TicketList = ({ tickets }: { tickets: Array<TicketOnEvent> }) => {
  return (
    <div className="flex flex-wrap gap-8 md:pl-16">
      {tickets.map((ticket) => {
        const ticketText =
          ticket.price > 0
            ? formatCurrency(ticket.price, ticket.currency!)
            : "free entry";

        return ticket.externalLink ? (
          <Link
            className="text-nowrap"
            key={ticket.name}
            href={ticket.externalLink}
          >
            <span className="underline underline-offset-8 hover:translate-y-0.5 hover:text-secondary">
              {ticket.name.toLowerCase()}
            </span>{" "}
            <span className="font-content text-sm">{ticketText}</span>
          </Link>
        ) : (
          <div key={ticket.name}>
            {ticket.name.toLowerCase() !== "regular" &&
            !(ticketText === "free" && tickets.length === 1)
              ? ticket.name.toLowerCase()
              : ""}{" "}
            <span className="font-content text-sm">{ticketText}</span>
          </div>
        );
      })}
    </div>
  );
};

const formatCurrency = (price: number, currency: string) => {
  const format = useFormatter();
  const formattedPrice = format.number(price, {
    style: "currency",
    currency: currency,
  });

  return formattedPrice.replaceAll(".00", "");
};
