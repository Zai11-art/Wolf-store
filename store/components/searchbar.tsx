"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Product } from "@/types";

const SearchBar = ({ data }: { data: Product[] }) => {
  const router = useRouter();

  return (
    <Stack sx={{ width: "100%", display: "flex" }}>
      <Autocomplete
        size="small"
        freeSolo
        id="searchbar"
        disableClearable
        disableCloseOnSelect
        options={data}
        // @ts-ignore
        getOptionLabel={(option) => option?.name}
        renderOption={(props, option) => (
          <Box
            onClick={() => router.push(`/product/${option.id}`)}
            sx={{
              display: "flex",
              width: "100%",
              gap: 1,
              paddingY: 0.5,
              paddingX: 1,
              cursor: "pointer",
              "&:hover": {
                opacity: "70%",
              },
            }}
          >
            <Box>
              <img
                src={option.images[0].url}
                style={{ width: 75, height: 75, borderRadius: 3 }}
                alt={option.name}
              />
            </Box>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle1">{option.name}</Typography>
                <Typography variant="subtitle1">${option.price}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="subtitle2">
                  {option.category.name}
                </Typography>
                <Typography variant="subtitle2">Rating: 2</Typography>
              </Box>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "search",
              placeholder: "search products",
            }}
          />
        )}
      />
    </Stack>
  );
};

export default SearchBar;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
