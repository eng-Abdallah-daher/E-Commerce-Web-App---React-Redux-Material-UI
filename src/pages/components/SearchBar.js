import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
  Popper,
  Grow,
  styled
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { obj } from '../../data/products';
import { debounce } from '../utils/Functions';
import { setSearchQuery } from '../../redux/slices/productsSlice';

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  }
}));

const SuggestionItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

export default function SearchBar({ chooseSuggest }) {
  const dispatch = useDispatch();
  const [suggest, setSuggest] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debounced(value);
    dispatch(setSearchQuery(value));
  };

  const debounced = useRef(
    debounce(val => {
      if (!val) {
        setShowSuggest(false);
        return;
      }
      const filtered = obj.results
        .map((p, i) => ({ ...p, originalIndex: i }))
        .filter(p =>
          p.productName.toLowerCase().includes(val.toLowerCase())
        );
      setSuggest(filtered);
      setShowSuggest(filtered.length > 0);
    }, 300)
  ).current;

  const handleSearchKey = (e) => {
    if (e.key === 'Enter') {
      if (!search) {
        setSelected(null);
      } else {
        const index = obj.results.findIndex(
          p => p.productName.toLowerCase() === search.toLowerCase()
        );
        if (index !== -1) {
          setSelected(index);
          chooseSuggest(index);
        }
      }
      setShowSuggest(false);
    }
  };

  const handleSuggestionClick = (p) => {
    chooseSuggest(p.originalIndex);
    setSearch(p.productName);
    setShowSuggest(false);
    dispatch(setSearchQuery(p.productName));
  };

  const handleClickAway = () => {
    setShowSuggest(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <SearchContainer ref={searchRef}>
        <TextField
          fullWidth
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          onFocus={() => {
            if (!search) {
              setShowSuggest(false);
            } else if (suggest.length > 0) {
              setShowSuggest(true);
            }
          }}
          onKeyDown={handleSearchKey}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider'
              }
            }
          }}
          variant="outlined"
          size="small"
        />

        <Popper
          open={showSuggest}
          anchorEl={searchRef.current}
          placement="bottom-start"
          transition
          style={{ width: searchRef.current?.offsetWidth, zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={200}>
              <Paper elevation={3} sx={{ mt: 0.5, maxHeight: 300, overflow: 'auto' }}>
                <List dense>
                  {suggest.map((p, i) => (
                    <SuggestionItem
                      key={i}
                      onClick={() => handleSuggestionClick(p)}
                      divider={i < suggest.length - 1}
                    >
                      <ListItemText primary={p.productName} />
                    </SuggestionItem>
                  ))}
                </List>
              </Paper>
            </Grow>
          )}
        </Popper>
      </SearchContainer>
    </ClickAwayListener>
  );
}
