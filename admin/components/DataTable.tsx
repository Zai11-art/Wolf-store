import * as React from "react";
import { Box, Button,useTheme } from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import { Category } from "@prisma/client";
import WarningDialog from "./warning-dialog";
import SplitButton from "./settings-dropdown";
import { CategoryProps } from "@/app/(dashboard)/[storeId]/(routes)/categories/components/CategoryMain";
import { ColorProps } from "@/app/(dashboard)/[storeId]/(routes)/colors/components/ColorMain";
import { OrderProps } from "@/app/(dashboard)/[storeId]/(routes)/orders/components/OrderMain";
import { PlacardProps } from "@/app/(dashboard)/[storeId]/(routes)/placards/components/PlacardMain";
import { ProductProps } from "@/app/(dashboard)/[storeId]/(routes)/products/components/ProductMain";
import OrderStatusToggle from "./order-status-toggle";

const DataTable = ({
  data,
  dataType,
}: {
  data:
    | CategoryProps[]
    | ColorProps[]
    | OrderProps[]
    | PlacardProps[]
    | ProductProps[]
    | undefined;
  dataType: string;
}) => {
  const [isMounted, setMounted] = React.useState(false);
  const theme = useTheme();

  
  // const buttonColorMode = theme.palette.mode === "dark" ? "black" : "white";
  // const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";

  React.useEffect(() => {
    if (!isMounted) {
      setMounted(true);
    }
  }, [data]);

  // @ts-ignore
  const columns = React.useMemo<MRT_ColumnDef<Category | ColorProps | OrderProps | PlacardProps | ProductProps>[]>(() => {
    if (dataType === "placards") {
      return [
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Placard Id",
          size: 150,
          enableClickToCopy: true,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <ContentCopyIcon fontSize="small" />
              <span>{`${
                cell.renderValue().slice(0, 4) +
                "..." +
                cell.renderValue().slice(-6)
              }`}</span>
            </Box>
          ),
        },
        {
          accessorKey: "label", //access nested data with dot notation
          header: "Placard Label",
          size: 150,
        },
        {
          accessorKey: "createdAt", //access nested data with dot notation
          header: "Created At",
          size: 150,
        },
        {
          accessorKey: "options", //access nested data with dot notation
          header: "Options",
          size: 150,
          Cell: ({ cell }) => (
            <SplitButton dataType="placards" id={cell.row.original.id} />
          ),
        },
      ];
    }

    if (dataType === "categories") {
      return [
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Category Id",
          size: 150,
          enableClickToCopy: true,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <ContentCopyIcon fontSize="small" />
              <span>{`${
                cell.renderValue().slice(0, 4) +
                "..." +
                cell.renderValue().slice(-6)
              }`}</span>
            </Box>
          ),
        },
        {
          accessorKey: "placardLabel", //access nested data with dot notation
          header: "Placard label",
          size: 150,
        },
        {
          accessorKey: "createdAt", //access nested data with dot notation
          header: "Created At",
          size: 150,
        },
        {
          accessorKey: "options", //access nested data with dot notation
          header: "Options",
          size: 150,
          Cell: ({ cell }) => (
            <SplitButton dataType="categories" id={cell.row.original.id} />
          ),
        },
      ];
    }

    if (dataType === "colors") {
      return [
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Color Id",
          size: 150,
          enableClickToCopy: true,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <ContentCopyIcon fontSize="small" />
              <span>{`${
                cell.renderValue().slice(0, 4) +
                "..." +
                cell.renderValue().slice(-6)
              }`}</span>
            </Box>
          ),
        },
        {
          accessorKey: "name", //access nested data with dot notation
          header: "Name",
          size: 150,
        },
        {
          accessorKey: "value", //access nested data with dot notation
          header: "Value",
          size: 150,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box
                sx={{
                  border: "solid 0.5px black",
                  borderRadius: "100%",
                  width: "25px",
                  height: "25px",
                  backgroundColor: `${cell.renderValue()}`,
                }}
              />
              <span>{`${cell.renderValue()}`}</span>
            </Box>
          ),
        },
        {
          accessorKey: "createdAt", //access nested data with dot notation
          header: "Created At",
          size: 150,
        },
        {
          accessorKey: "options", //access nested data with dot notation
          header: "Options",
          size: 150,
          Cell: ({ cell }) => (
            <SplitButton dataType="colors" id={cell.row.original.id} />
          ),
        },
      ];
    }

    if (dataType === "sizes") {
      return [
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Size Id",
          size: 150,
          enableClickToCopy: true,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <ContentCopyIcon fontSize="small" />
              <span>{`${
                cell.renderValue().slice(0, 4) +
                "..." +
                cell.renderValue().slice(-6)
              }`}</span>
            </Box>
          ),
        },
        {
          accessorKey: "name", //access nested data with dot notation
          header: "Name",
          size: 150,
        },
        {
          accessorKey: "value", //access nested data with dot notation
          header: "Value",
          size: 150,
        },
        {
          accessorKey: "createdAt", //access nested data with dot notation
          header: "Created At",
          size: 150,
        },
        {
          accessorKey: "options", //access nested data with dot notation
          header: "Options",
          size: 150,
          Cell: ({ cell }) => (
            <SplitButton dataType="sizes" id={cell.row.original.id} />
          ),
        },
      ];
    }

    if (dataType === "orders") {
      return [
       
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Order Id",
          size: 150,
          enableClickToCopy: true,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1}}>
              <ContentCopyIcon fontSize="small" />
              <span>{`${
                cell.renderValue().slice(0, 4) +
                "..." +
                cell.renderValue().slice(-4)
              }`}</span>
            </Box>
          ),
        },
        {
          accessorKey: "orderStatus", //access nested data with dot notation
          header: "Order Status",
          size: 150,
          Cell: ({ cell }) => (
            <>
              {/* ADD FEATURES HERE */}
              {/* @ts-ignore */}
              <OrderStatusToggle id={cell.row.original.id} status={cell.renderValue() ? cell.renderValue() : ''} />
            </>
          ),
        },
        // {
        //   accessorKey: "orderStatus", //access nested data with dot notation
        //   header: "Order Status",
        //   size: 150,
        //   Cell: ({ cell }) => (
        //     <>
        //       {/* ADD FEATURES HERE */}
        //       <Button sx={{ backgroundColor: 'black' ,textAlign: 'center',  borderRadius: 10, paddingX: 2}}>
        //         <code
        //           style={{
        //             color:
        //               cell.renderValue() === "processing"
        //                 ? "#b8af04"
        //                 : cell.renderValue() === "failed"
        //                 ? "red"
        //                 : cell.renderValue() === "shippped"
        //                 ? "orange"
        //                 : cell.renderValue() === "delivered"
        //                 ? "green"
        //                 : cell.renderValue() === "cancelled"
        //                 ? "red"
        //                 : "white",
        //             fontWeight: "bold",
        //           }}
        //         >{`${cell.renderValue()}`}</code>
        //       </Button>
        //     </>
        //   ),
        // },
        {
          accessorKey: "isPaid", //access nested data with dot notation
          header: "Paid Status",
          size: 150,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <code
                style={{
                  color: cell.renderValue() === "true" ? "#47ad50" : "#d12626",
                  fontWeight: "bold",
                }}
              >{`${cell.renderValue()}`}</code>
            </Box>
          ),
        },
        {
          accessorKey: "store", //access nested data with dot notation
          header: "Store Name",
          size: 150,
        },
        {
          accessorKey: "phone", //access nested data with dot notation
          header: "Phone No.",
          size: 150,
        },
        {
          accessorKey: "address", //access nested data with dot notation
          header: "Address",
          size: 150,
        },
        {
          accessorKey: "createdAt", //access nested data with dot notation
          header: "Order Date",
          size: 150,
        },
        {
          accessorKey: "products", //access nested data with dot notation
          header: "Product",
          size: 150,
        },
        {
          accessorKey: "options", //access nested data with dot notation
          header: "Options",
          size: 150,
          Cell: ({ cell }) => (
              <SplitButton dataType="orders" id={cell.row.original.id} />
          ),
        },
      ];
    }

    if (dataType === "products") {
      return [
        {
          accessorKey: "id",
          header: "Product Id",
          enableClickToCopy: true,
          size: 175,
          Cell: ({ cell }: { cell: { renderValue: () => any } }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <ContentCopyIcon />
              <span>{`${
                cell.renderValue().slice(0, 4) +
                "..." +
                cell.renderValue().slice(-6)
              }`}</span>
            </Box>
          ),
        },
        {
          accessorKey: "name", //access nested data with dot notation
          header: "Product Name",
          size: 150,
        },
        {
          accessorKey: "size", //access nested data with dot notation
          header: "Size",
          size: 150,
        },
        {
          accessorKey: "color", //access nested data with dot notation
          header: "Color",
          size: 150,
        },
        {
          accessorKey: "category", //access nested data with dot notation
          header: "Category",
          size: 150,
        },
        {
          accessorKey: "stocks", //access nested data with dot notation
          header: "Stocks",
          size: 150,
        },
        {
          accessorKey: "price", //access nested data with dot notation
          header: "Total Price",
          size: 150,
        },
        {
          accessorKey: "isFeatured", //access nested data with dot notation
          header: "Featured?",
          size: 150,
        },
        {
          accessorKey: "isArchived", //access nested data with dot notation
          header: "Archived?",
          size: 150,
        },
        {
          accessorKey: "createdAt", //access nested data with dot notation
          header: "Creation Date",
          size: 150,
        },
        {
          accessorKey: "options", //access nested data with dot notation
          header: "Options",
          size: 150,
          Cell: ({ cell }) => (
            <SplitButton dataType="products" id={cell.row.original.id} />
          ),
        },
      ];
    }
  }, []);

  return (
    <>
      <WarningDialog loading={false} />
      <MaterialReactTable
        muiTableContainerProps={{ sx: { height: "500px" } }}
        enableGrouping
        columns={columns}
        // @ts-ignore
        data={data}
      />
    </>
  );
};

export default DataTable;
