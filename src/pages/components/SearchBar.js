import React, { useState, useRef, useEffect } from 'react';
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
const SuggestionItem = React.forwardRef(({ children, ...props }, ref) => (
  <ListItem ref={ref} {...props}>
    {children}
  </ListItem>
));
export default function SearchBar({ chooseSuggest }) {
  const dispatch = useDispatch();
  const [suggest, setSuggest] = useState([]);
  const [search, setSearch] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef({});
  useEffect(() => {
    return () => {
      suggestionsRef.current = {};
    };
  }, [suggest]);
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
        setHighlightedIndex(-1);
        return;
      }
      const filtered = obj.results
        .map((p, i) => ({ ...p, originalIndex: i }))
        .filter(p =>
          p.productName.toLowerCase().includes(val.toLowerCase())
        );
      setSuggest(filtered);
      setShowSuggest(filtered.length > 0);
      setHighlightedIndex(-1);
    }, 300)
  ).current;
  const handleSearchKey = (e) => {
    if (showSuggest && suggest.length > 0) {
      switch (e.key) {
        case 'Tab':
          if (!e.shiftKey) {
            e.preventDefault();
            setHighlightedIndex(0);
            try {
              if (suggestionsRef.current[0]) {
                suggestionsRef.current[0].focus();
              }
            } catch (error) {
              console.log('Error focusing on first suggestion:', error);
            }
          }
          break;
        case 'Escape':
          setShowSuggest(false);
          break;
        case 'Enter':
          if (!search) {
          } else if (highlightedIndex >= 0 && highlightedIndex < suggest.length) {
            handleSuggestionClick(suggest[highlightedIndex]);
          } else {
            const index = obj.results.findIndex(
              p => p.productName.toLowerCase() === search.toLowerCase()
            );
            if (index !== -1) {
              chooseSuggest(index);
            }
          }
          setShowSuggest(false);
          break;
        default:
          break;
      }
    } else if (e.key === 'Enter') {
      if (!search) {
      } else {
        const index = obj.results.findIndex(
          p => p.productName.toLowerCase() === search.toLowerCase()
        );
        if (index !== -1) {
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
    setHighlightedIndex(-1);
    dispatch(setSearchQuery(p.productName));
  };
  const handleClickAway = () => {
    setShowSuggest(false);
    setHighlightedIndex(-1);
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
            setHighlightedIndex(-1);
          }}
          onKeyDown={handleSearchKey}
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls={showSuggest ? 'search-suggestions' : undefined}
          aria-expanded={showSuggest}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon aria-hidden="true" />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider'
              },
              '&:focus-within': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: 2
                }
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
              <Paper
                elevation={3}
                sx={{ mt: 0.5, maxHeight: 300, overflow: 'auto' }}
                role="listbox"
                id="search-suggestions"
                aria-label="Search suggestions"
              >
                <List dense>
                  {suggest.map((p, i) => (
                    <SuggestionItem
                      key={i}
                      ref={el => suggestionsRef.current[i] = el}
                      onClick={() => handleSuggestionClick(p)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSuggestionClick(p);
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          const nextIndex = i < suggest.length - 1 ? i + 1 : 0;
                          if (suggestionsRef.current[nextIndex]) {
                            suggestionsRef.current[nextIndex].focus();
                            setHighlightedIndex(nextIndex);
                          }
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          const prevIndex = i > 0 ? i - 1 : suggest.length - 1;
                          if (suggestionsRef.current[prevIndex]) {
                            suggestionsRef.current[prevIndex].focus();
                            setHighlightedIndex(prevIndex);
                          }
                        } else if (e.key === 'Escape') {
                          setShowSuggest(false);
                          const searchInput = document.querySelector('input[placeholder="Search"]');
                          if (searchInput) {
                            searchInput.focus();
                          }
                        }
                      }}
                      onFocus={() => setHighlightedIndex(i)}
                      divider={i < suggest.length - 1}
                      tabIndex="0"
                      role="option"
                      aria-selected={highlightedIndex === i}
                      aria-label={`Search result: ${p.productName}`}
                      sx={(theme) => ({
                        backgroundColor: highlightedIndex === i || (highlightedIndex === -1 && i === 0)
                          ? theme.palette.action.selected
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        },
                        '&:focus': {
                          backgroundColor: theme.palette.action.selected,
                          outline: `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: '-2px'
                        }
                      })}
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
