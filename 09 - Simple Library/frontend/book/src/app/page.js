"use client";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  authorBooks,
  categoryBooks,
  filterBooks,
  loadBooks,
  reset,
} from "@/redux/slices /books";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { flushSync } from "react-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Book() {
  //search
  const [search, setSearch] = useState("");
  // filters
  // const [filter, setFilter] = useState({
  //   pageLte: "",
  //   pageGte: "",
  // });
  const [filter, setFilter] = useState([]);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
    setPage(1)
  };
  // axios
  // const [books,setBooks] = useState([])
  // const listBooks =async()=>{
  //   const response = await axios.get('http://localhost:8000/api/books/book')
  //   setBooks(response.data.results)
  // }
  // useEffect(()=>{
  //   listBooks()
  // },[])

  //  redux
  const books = useSelector((state) => state.bookReducer.books);
  const dispatch = useDispatch();
  const booksList = async (anything) => {
    try {
      await dispatch(
        loadBooks({
          // search
          search: anything,
          // //filter
          // page_numbers__lte: filter.pageLte,
          // page_numbers__gte: filter.pageGte,

          //filter
          page_numbers__lte: filter[1],
          page_numbers__gte: filter[0],

          //category
          Categories: filterCategory,
          // author
          author: [filterAuthor],

          // Pagination
          limit:LIMIT,
          offset:offset
        })
      ).unwrap();
      // console.log(reset({ treset: 123}));
    } catch (e) {
      console.log("error");
    }
  };


  // filter
  const page_numbers_book = useSelector((state) => state.bookReducer.page_numbers);

  const pageBook = async () => {
    try {
      const resp = await dispatch(filterBooks()).unwrap();
      setFilter([resp.page_number_min, resp.page_number_max]);
      // console.log(reset({ treset: 123}));
    } catch (e) {
      console.log("error");
    }
  };
  useEffect(() => {
    pageBook();
  }, []);
  // filterCategory
  const [filterCategory, setFilterCategory] = useState();
  const categories = useSelector((state) => state.bookReducer.categories);
  const categorylist = async () => {
    try {
      await dispatch(categoryBooks()).unwrap();
    } catch (e) {
      console.log("error");
    }
  };
  useEffect(() => {
    categorylist();
  }, []);

  // filterAuthor
  const [filterAuthor, setFilterAuthor] = useState();
  const authors = useSelector((state) => state.bookReducer.authors);
  const authorsList = async () => {
    try {
      await dispatch(authorBooks()).unwrap();
    } catch (e) {
      console.log("error");
    }
  };
  useEffect(() => {
    authorsList();
  }, []);

  // Pagination
  const LIMIT = 10;
  const count = useSelector((state) => state.bookReducer.count);
  const [page,setPage] = useState(1);
  const number_of_pages = Math.ceil(count/LIMIT)
  const offset  = (page-1)*LIMIT
  useEffect(() => {
    booksList(search);
  }, [page, filterAuthor, filterCategory, filter]);
  return (
    <main className="flex min-h-screen flex-col  p-24">
      <div className="flex py-2 justify-between">
        <div className="flex">
          <TextField
            label="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // icon search
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {/* clear search */}
                  {search && (
                    <IconButton
                      onClick={() => {
                        setSearch("");
                        // input parameter is anything
                        booksList("");
                      }}
                    >
                      <CloseIcon className="text-base" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            size="small"
            className="flex-grow md:flex-grow-0 "
          />
          <Button
            variant="outlined"
            size="small"
            className=" "
            // search is state
            onClick={() => booksList(search)}
            style={{
              textTransform: "none",
            }}
          >
            Search
          </Button>
        </div>
        {/* Filter */}
        <div className="flex gap-4">
          {/* <TextField
            label="Page less..."
            value={filter.pageGte}
            onChange={(e) => setFilter({ ...filter, pageGte: e.target.value })}
            InputLabelProps={{ shrink: true }}
            // icon search
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      booksList();
                    }}
                  >
                    {" "}
                    <ArrowBackIosIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            className="flex-grow md:flex-grow-0 "
          />
          page numbers
          <TextField
            label="Page more..."
            value={filter.pageLte}
            onChange={(e) => setFilter({ ...filter, pageLte: e.target.value })}
            // icon search
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => {
                      booksList();
                    }}
                  >
                    {" "}
                    <ArrowBackIosIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            className="flex-grow md:flex-grow-0 "
          /> */}
          <div className=" w-[200px]">
            <Slider
              value={filter}
              onChange={handleChange}
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
              disableSwap
              max={page_numbers_book.page_number_max}
              min={page_numbers_book.page_number_min}
            />
          </div>
          {/* <Button
            variant="outlined"
            onClick={() => {
              booksList(search);
            }}
          >
            {" "}
            Filter
          </Button> */}
          {/* category */}
          <FormControl className="w-40">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterCategory}
              label="Category"
              onChange={(e) => {
                setFilterCategory(e.target.value)
                setPage(1)
              }}
            >
              <MenuItem>All</MenuItem>
              {categories?.map((cat) => (
                <MenuItem value={cat.id} key={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* author */}
          <FormControl className="w-40">
            <InputLabel id="demo-simple-select-label">Author</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterAuthor}
              label="Category"
              // multiple
              onChange={(e) => {
                setFilterAuthor(e.target.value)
                setPage(1)
              }}
            >
              <MenuItem>All</MenuItem>
              {authors?.map((au) => (
                <MenuItem value={au.id} key={au.id}>
                  {au.first_name}{' '}{au.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Authors</TableCell>
              <TableCell align="center">Tag</TableCell>
              <TableCell align="center">Category</TableCell>

              <TableCell align="center">Created_at</TableCell>

              <TableCell align="center">PageNumbers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((item, index) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="center">
                  {item.authors
                    .filter((_, index) => index < 2)
                    .map((author) => {
                      return `${author.first_name} ${author.last_name}`;
                    })}
                </TableCell>
                <TableCell align="center">
                  {item.tag.map((tag, index) => {
                    //  return index <2 ? `${tag.name} ` : undefined
                    return tag.name;
                  })}
                </TableCell>

                <TableCell align="center">{item.Categories?.name}</TableCell>

                <TableCell align="center">{item.created_at}</TableCell>
                <TableCell align="center">{item.page_numbers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <Pagination count={number_of_pages} page={page} onChange={(e,v)=>setPage(v) }color="primary" />
    </main>
  );
}
