const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      or: [
        {
          property: "In stock",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Cost of next trip",
          number: {
            greater_than_or_equal_to: 2,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Last ordered",
        direction: "ascending",
      },
    ],
  });
  res.status(200).json({ response });
};
