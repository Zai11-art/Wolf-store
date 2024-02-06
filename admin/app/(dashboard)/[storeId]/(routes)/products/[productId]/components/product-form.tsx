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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useRouter } from "next/navigation";

import WarningDialog from "@/components/warning-dialog";
import ImageUploadMultiple from "@/components/image-upload-multiple";
import { Category, Color, Image, Product, Size } from "@prisma/client";

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
    images: yup
      .array()
      .of(yup.object().shape({ url: yup.string() }))
      .min(1)
      .max(5),
    price: yup.number().min(1),
    categoryId: yup.string().min(1),
    colorId: yup.string().min(1),
    sizeId: yup.string().min(1),
    isFeatured: yup.boolean().default(false).optional(),
    isArchived: yup.boolean().default(false).optional(),
    description: yup.string().min(1),
    stocks: yup.number().min(1),
  })
  .required();

type ProductFormValuesTypes = yup.InferType<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({
  data,
  categories,
  colors,
  sizes,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const md = useMediaQuery("(min-width:1200px)");

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

  const initialValue = {
    name: `${data ? data?.name : ""}`,
    images: data ? data.images : [{}],
    price: `${data ? data?.price : ""}`,
    categoryId: `${data ? data?.categoryId : ""}`,
    colorId: `${data ? data?.colorId : ""}`,
    sizeId: `${data ? data?.sizeId : ""}`,
    isFeatured: data ? data?.isFeatured : false,
    isArchived: data ? data?.isArchived : false,
    description: `${data ? data?.description : ""}`,
    stocks: `${data ? data?.stocks : ""}`,
  };

  // FIX ROUTES
  const onSubmit = async (payload: ProductFormValuesTypes) => {
    console.log(payload);
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
      <WarningDialog loading={loading} />
      <Container
        maxWidth={false}
        sx={{ display: "flex", flexDirection: "column", marginBottom: 12 }}
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
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h4"
              component="div"
            >
              {data ? "Edit Products" : "Create Products"}
            </Typography>
            <Typography
              style={{
                color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
              }}
            >
              {data
                ? "Edit your Products here."
                : "Create new Products for your store."}
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
        <Box sx={{ display: "flex" }}>
          <Formik
            onSubmit={onSubmit}
            validationSchema={formSchema}
            // @ts-ignore
            initialValues={initialValue}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", width: "100%", height: "100%" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    gap: 3,
                    flexDirection: md ? "row" : "column",
                  }}
                >
                  {/* IMAGE SECTION */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                      Placard Image
                    </Typography>

                    {/*FIXING: TO BE FIXED: FIND A WAY TO UPLOAD WITH THE FORM */}
                    <ImageUploadMultiple
                      // @ts-ignore
                      data={data}
                      disabled={loading}
                      setFieldValue={setFieldValue}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {/* PRODUCT NAME AND PRICE */}
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        gap: 5,
                      }}
                    >
                      <Box
                        sx={{
                          marginY: md ? "30px" : null,
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", marginY: "15px" }}
                        >
                          Product Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          label="Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          error={Boolean(touched.name) && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          variant="outlined"
                          name="name"
                          required
                        />
                      </Box>

                      <Box
                        sx={{
                          marginY: md ? "30px" : null,
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", marginY: "15px" }}
                        >
                          Price
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          label="Product Price"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          error={
                            Boolean(touched.price) && Boolean(errors.price)
                          }
                          helperText={touched.price && errors.price}
                          variant="outlined"
                          name="price"
                          required
                        />
                      </Box>
                    </Box>

                    {/* PRODUCT DESCRIPTION HERE */}
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        gap: 5,
                      }}
                    >
                      <Box
                        sx={{
                          marginY: md ? "30px" : null,
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", marginY: "15px" }}
                        >
                          Product Description
                        </Typography>
                        <TextField
                          sx={{ width: "100%", height: "100%" }}
                          label="Description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          error={
                            Boolean(touched.description) &&
                            Boolean(errors.description)
                          }
                          helperText={touched.description && errors.description}
                          variant="outlined"
                          name="description"
                          required
                          multiline
                          rows={10}
                        />
                      </Box>
                    </Box>

                    {/* CATEGORY, SIZES , COLORS */}
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          gap: md ? 5 : 0,
                          flexDirection: md ? "row" : "column",
                        }}
                      >
                        <Box
                          sx={{
                            marginY: md ? "30px" : null,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", marginY: "15px" }}
                          >
                            Category
                          </Typography>
                          <FormControl>
                            <InputLabel id="demo-simple-select-disabled-label">
                              Category
                            </InputLabel>
                            <Select
                              label="Categories"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.categoryId}
                              error={
                                Boolean(touched.categoryId) &&
                                Boolean(errors.categoryId)
                              }
                              variant="outlined"
                              name="categoryId"
                              required
                              sx={{
                                width: md ? "100%" : "100%",
                                display: "flex",
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {categories.map((cat) => (
                                <MenuItem value={cat.id}>{cat.name}</MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>Disabled</FormHelperText>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            marginY: md ? "30px" : null,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", marginY: "15px" }}
                          >
                            Size
                          </Typography>
                          <FormControl>
                            <InputLabel id="demo-simple-select-disabled-label">
                              size
                            </InputLabel>
                            <Select
                              label="Sizes"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.sizeId}
                              error={
                                Boolean(touched.sizeId) &&
                                Boolean(errors.sizeId)
                              }
                              variant="outlined"
                              name="sizeId"
                              required
                              sx={{
                                width: md ? "100%" : "100%",
                                display: "flex",
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {sizes.map((size) => (
                                <MenuItem value={size.id}>{size.name}</MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>Disabled</FormHelperText>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            marginY: md ? "30px" : null,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", marginY: "15px" }}
                          >
                            Color
                          </Typography>
                          <FormControl>
                            <InputLabel id="demo-simple-select-disabled-label">
                              color
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-disabled-label"
                              label="Color"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.colorId}
                              error={
                                Boolean(touched.colorId) &&
                                Boolean(errors.colorId)
                              }
                              variant="outlined"
                              name="colorId"
                              required
                              sx={{
                                width: md ? "100%" : "100%",
                                display: "flex",
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {colors.map((color) => (
                                <MenuItem value={color.id}>
                                  {color.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>Disabled</FormHelperText>
                          </FormControl>
                        </Box>
                      </Box>
                    </Box>

                    {/* FEATURED AND ARCHIVED */}
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        gap: 5,
                      }}
                    >
                      <Box
                        sx={{
                          marginY: md ? "30px" : null,
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", marginY: "15px" }}
                        >
                          Stocks Available
                        </Typography>
                        <TextField
                          sx={{ width: "100%", height: "100%" }}
                          label="Stocks"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.stocks}
                          error={
                            Boolean(touched.stocks) && Boolean(errors.stocks)
                          }
                          helperText={touched.stocks && errors.stocks}
                          variant="outlined"
                          name="stocks"
                          required
                          type="number"
                        />
                      </Box>

                      <Box
                        sx={{
                          marginY: md ? "30px" : null,
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", marginY: "15px" }}
                        >
                          Feature Product?
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{ width: "100%" }}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.isFeatured}
                              name="isFeatured"
                              checked={values.isFeatured}
                            />
                          }
                          label="Featured"
                        />
                      </Box>

                      <Box
                        sx={{
                          marginY: md ? "30px" : null,
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", marginY: "15px" }}
                        >
                          Archive Product?
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{ width: "100%" }}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.isArchived}
                              name="isArchived"
                              checked={values.isArchived}
                            />
                          }
                          label="Archived"
                        />
                      </Box>
                    </Box>

                    {/* SUBMIT BUTTON */}
                    <Box sx={{ marginTop: 3 }}>
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
                          paddingX: "50px",
                        }}
                        type="submit"
                      >
                        {data ? "UPDATE" : "CREATE"}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
};

export default ProductForm;
