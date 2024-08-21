import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import { message } from "antd";

const HandleDownloadRoutes = async ({ fastestRoute }) => {
  if (!fastestRoute || !fastestRoute.legs) {
    message.error({
      type: "error",
      content: "No fastest route available for download.",
    });
    return;
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Fastest Routes",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 100,
              after: 100,
              line: 100,
            },
          }),
          ...fastestRoute.legs
            .map((route, index) => {
              return [
                new Paragraph({
                  text: `Route ${index + 1}`,
                  heading: HeadingLevel.HEADING_2,
                  spacing: {
                    before: 450,
                    after: 250,
                    line: 250,
                  },
                }),
                new Paragraph({
                  spacing: {
                    before: 250,
                    after: 250,
                    line: 250,
                  },

                  children: [
                    new TextRun({
                      text: "Name: ",
                      bold: true,
                    }),
                    new TextRun({
                      text: `${route.studentFirstName} ${route.studentLastName}`,
                      size: 24,
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                    after: 250,
                    line: 250,
                  },
                  children: [
                    new TextRun({
                      text: "Phone Number: ",
                      bold: true,
                    }),
                    new TextRun({
                      text: `${route.studentPhone.replace(
                        /^(\d{3})(\d{3})(\d{4})/,
                        "$1-$2-$3"
                      )}`,
                      size: 24,
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                    after: 250,
                    line: 250,
                  },
                  children: [
                    new TextRun({
                      text: "Start Address: ",
                      bold: true,
                    }),
                    new TextRun({
                      text: route.start_address,
                      size: 24,
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                    after: 250,
                    line: 250,
                  },
                  children: [
                    new TextRun({
                      text: "End Address: ",
                      bold: true,
                    }),
                    new TextRun({
                      text: route.end_address,
                      size: 24,
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                    after: 250,
                    line: 250,
                  },
                  children: [
                    new TextRun({
                      text: "Duration: ",
                      bold: true,
                    }),
                    new TextRun({
                      text: route.duration.text,
                      size: 24,
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 200,
                    after: 250,
                    line: 250,
                  },
                  children: [
                    new TextRun({
                      text: "Distance: ",
                      bold: true,
                    }),
                    new TextRun({
                      text: route.distance.text,
                      size: 24,
                    }),
                  ],
                }),
              ].filter(Boolean);
            })
            .flat(),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `saved_routes_${new Date().toDateString()}.docx`);
};

export default HandleDownloadRoutes;
