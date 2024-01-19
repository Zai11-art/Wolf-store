import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { PlacardProps } from "@/app/(dashboard)/[storeId]/(routes)/placards/page";
import { Button } from "@mui/material";

import SplitButton from "./settings-dropdown";
import WarningDialog from "./warning-dialog";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

const ButtonSet = () => {
  return <Button></Button>;
};

const DataTable = ({
  data,
  dataType,
}: {
  data: PlacardProps[] | undefined;
  dataType: string;
}) => {
  const [isMounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!isMounted) {
      setMounted(true);
    }
  }, [data]);

  // @ts-ignore
  const columns = React.useMemo<MRT_ColumnDef<PlacardProps>[]>(() => {
    if (dataType === "placards") {
      return [
        {
          accessorKey: "label", //access nested data with dot notation
          header: "Placard Label",
          size: 150,
        },
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Placard Id",
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
          accessorKey: "placardLabel", //access nested data with dot notation
          header: "Placard label",
          size: 150,
        },
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Category Id",
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
          accessorKey: "name", //access nested data with dot notation
          header: "Color Name",
          size: 150,
        },
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Color Id",
          size: 150,
        },
        {
          accessorKey: "value", //access nested data with dot notation
          header: "Color Value",
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
            <SplitButton dataType="colors" id={cell.row.original.id} />
          ),
        },
      ];
    }

    if (dataType === "sizes") {
      return [
        {
          accessorKey: "name", //access nested data with dot notation
          header: "Size Name",
          size: 150,
        },
        {
          accessorKey: "id", //access nested data with dot notation
          header: "Size Id",
          size: 150,
        },
        {
          accessorKey: "value", //access nested data with dot notation
          header: "Size Value",
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
  }, []);

  return (
    <>
      <WarningDialog loading={false} />
      <MaterialReactTable
        muiTableContainerProps={{ sx: { height: "300px" } }}
        enableGrouping
        columns={columns}
        data={data || []}
      />
    </>
  );
};

export default DataTable;

// renderCell: (params) => {
//   return (
//     <Stack direction="row" spacing={2}>
//       <Button variant="text" color="inherit" size="small">
//         <SettingsIcon />
//       </Button>
//     </Stack>
//   );
// },
