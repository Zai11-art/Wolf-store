"use client";

import {
  Container,
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";

// React hook form
import ImageUpload from "@/components/image-upload";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningDialog from "@/components/warning-dialog";

interface ProductFormProps {
  data:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const formSchema = yup
  .object({
    name: yup.string().min(1),
    images: yup.array().of(yup.object({ url: yup.string() })),
    price: yup.number().min(1),
    categoryId: yup.string().min(1),
    colorId: yup.string().min(1),
    sizeId: yup.string().min(1),
    isFeatured: yup.boolean().default(false).optional(),
    isArchived: yup.boolean().default(false).optional(),
  })
  .required();

type ProductFormValuesTypes = yup.InferType<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({
  data,
  categories,
  colors,
  sizes,
}) => {
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const sm = useMediaQuery("(min-width:700px)");

  // SELECT
  const [select, setSelect] = useState("");
  const handleChange = (e: SelectChangeEvent) => {
    setSelect(e.target.value);
  };

  const theme = useTheme();
  const params = useParams();
  const router = useRouter();

  const buttonColorMode = theme.palette.mode === "dark" ? "#ff1507" : "#ff1507";
  const buttonTextMode = theme.palette.mode === "dark" ? "white" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "white" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const buttonColorMode2 = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode2 = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode2 = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode2 = theme.palette.mode === "dark" ? "white" : " black";

  const form = useForm<ProductFormValuesTypes>({
    resolver: yupResolver(formSchema),
    defaultValues: data
      ? { ...data, price: parseFloat(String(data?.price)) }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // FIX ROUTES
  const onSubmit = async (payload: ProductFormValuesTypes) => {
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          payload
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, payload);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Submitted successfully");
    } catch (error) {
      console.log("[ERROR_SUBMIT_PRODUCT]", error);
      toast.error("Error submitting.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Submitted successfully");
    } catch (error) {
      console.log("[ERROR_DELETE_PRODUCT]", error);
      toast.error("Error submitting.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <WarningDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Container
        maxWidth={false}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            // marginBottom: "20px",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: "1px",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h4"
              component="div"
            >
              {data ? "Edit Placard" : "Create Placard"}
            </Typography>
            <Typography
              style={{
                color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
              }}
            >
              {data
                ? "Edit your placard here."
                : "Create new placard for your store."}
            </Typography>
          </Box>
          {data && (
            <Button
              onClick={() => onDelete()}
              variant="contained"
              sx={{
                backgroundColor: buttonColorMode,
                color: buttonTextMode,
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: hoverColorMode,
                  color: hoverTextMode,
                },
                height: "35px",
                display: "flex",
              }}
            >
              <DeleteIcon />
              <span style={{ marginTop: "2px" }}>DELETE</span>
            </Button>
          )}
        </Box>

        <Divider
          sx={{
            mb: "30px",
            mt: "20px",
            // borderBottomWidth: "1px",
            backgroundColor:
              theme.palette.mode === "dark" ? "#555555" : "#c4c4c4",
          }}
        />

        {/* DATE SECTIONS */}
        <Box>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{ marginBottom: "30px" }}>
              <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                Placard Image
              </Typography>

              {/*FIXING: TO BE FIXED: FIND A WAY TO UPLOAD WITH THE FORM */}
              <ImageUpload
                // value={field}
                disabled={loading}
                // onChange={()}
                // onRemove={}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "18px",
                width: "100%",
              }}
            >
              <Box
                sx={{ marginY: sm ? "30px" : null, width: sm ? null : "100%" }}
              >
                <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                  Name
                </Typography>
                <TextField
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  required
                  sx={{ width: sm ? "400px" : null, display: "flex" }}
                  {...register("name", { required: true })}
                />
              </Box>
              <Box
                sx={{ marginY: sm ? "30px" : null, width: sm ? null : "100%" }}
              >
                <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                  Price
                </Typography>
                <TextField
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  required
                  type="number"
                  sx={{ width: sm ? "400px" : null, display: "flex" }}
                  {...register("price", { required: true })}
                />
              </Box>

              <Box
                sx={{
                  marginY: sm ? "30px" : null,
                  display: "flex",
                  flexDirection: "column",
                  width: sm ? null : "100%",
                }}
              >
                <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                  Category
                </Typography>
                <FormControl>
                  <InputLabel id="demo-simple-select-disabled-label">
                    category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={select}
                    label="category"
                    onChange={handleChange}
                    sx={{ width: sm ? "400px" : null, display: "flex" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.map((cat) => (
                      <MenuItem value={cat.name}>{cat.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Disabled</FormHelperText>
                </FormControl>
              </Box>
              <Box
                sx={{
                  marginY: sm ? "30px" : null,
                  display: "flex",
                  flexDirection: "column",
                  width: sm ? null : "100%",
                }}
              >
                <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                  Size
                </Typography>
                <FormControl>
                  <InputLabel id="demo-simple-select-disabled-label">
                    size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={select}
                    label="size"
                    onChange={handleChange}
                    sx={{ width: sm ? "400px" : null, display: "flex" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {sizes.map((size) => (
                      <MenuItem value={size.name}>{size.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Disabled</FormHelperText>
                </FormControl>
              </Box>
              <Box
                sx={{
                  marginY: sm ? "30px" : null,
                  display: "flex",
                  flexDirection: "column",
                  width: sm ? null : "100%",
                }}
              >
                <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                  Color
                </Typography>
                <FormControl>
                  <InputLabel id="demo-simple-select-disabled-label">
                    color
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={select}
                    label="color"
                    onChange={handleChange}
                    sx={{ width: sm ? "400px" : null, display: "flex" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {colors.map((color) => (
                      <MenuItem value={color.name}>{color.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Disabled</FormHelperText>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ marginY: "30px" }}>
              <Button
                sx={{
                  backgroundColor: buttonColorMode2,
                  color: buttonTextMode2,
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: hoverColorMode2,
                    color: hoverTextMode2,
                  },
                  fontSize: "13.5px",
                  paddingY: "4px",
                }}
                type="submit"
              >
                Add Store
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ProductForm;
