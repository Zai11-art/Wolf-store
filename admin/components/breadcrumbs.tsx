import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useParams, usePathname } from "next/navigation";


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs() {
  const pathName = usePathname();
  const params = useParams();
  console.log(pathName.split("/"));

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "13px" }}>
        <Link underline="hover" color="inherit" >
          Store
        </Link>
        <Link underline="hover" color="inherit" href={`/${params.storeId}`}>
          {`${pathName.slice(1, 8)}...${pathName.slice(-5)}`}
        </Link>
        <Typography sx={{ fontSize: "13px" }} color="text.primary">
          {pathName.split("/").length > 3
            ? pathName.split("/")[pathName.split("/").length]
            : "Dashboard"}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
