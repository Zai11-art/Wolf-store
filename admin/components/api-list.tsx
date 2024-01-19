import { Box, useMediaQuery } from "@mui/material";
import ApiCard from "@/components/api-card";
import { useRoot } from "@/hooks/use-root";
import { useParams } from "next/navigation";

interface ApiListProps {
  sectionName: string;
  sectionId: string;
}

export default function ApiList({ sectionName, sectionId }: ApiListProps) {
  const sm = useMediaQuery("(min-width:1200px)");
  const originUrl = `${useRoot()}/api/${useParams().storeId}`;

  const cardProps = [
    {
      GET: "GET",
      link: `${originUrl}/${sectionName}`,
      privacy: "PUBLIC",
    },
    {
      GET: "GET",
      link: `${originUrl}/${sectionName}/{${sectionId}}`,
      privacy: "PUBLIC",
    },
    { GET: "POST", link: `${originUrl}/${sectionName}`, privacy: "ADMIN" },
    {
      GET: "PATCH",
      link: `${originUrl}/${sectionName}/{${sectionId}}`,
      privacy: "ADMIN",
    },
    {
      GET: "DELETE",
      link: `${originUrl}/${sectionName}/{${sectionId}}`,
      privacy: "ADMIN",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        marginTop: "10px",
        gap: "15px",
        flexWrap: sm ? "nowrap" : "wrap",
      }}
    >
      {cardProps.map((card) => (
        <ApiCard label={card.GET} link={card.link} privacy={card.privacy} />
      ))}
    </Box>
  );
}
