import { useState, useEffect, useRef } from 'react';
import type { SearchSuggestion } from '../types/recipe';

interface SearchBarProps {
  placeholder?: string;
  onSelectSuggestion: (suggestion: string) => void;
  onSearch?: () => void;
}

// Mock data for search suggestions
const mockSuggestions: SearchSuggestion[] = [
  { id: '1', value: 'pomodoro', type: 'ingredient' },
  { id: '2', value: 'basilico', type: 'ingredient' },
  { id: '3', value: 'mozzarella', type: 'ingredient' },
  { id: '4', value: 'aglio', type: 'ingredient' },
  { id: '5', value: 'pasta', type: 'ingredient' },
  { id: '6', value: 'pollo', type: 'ingredient' },
  { id: '7', value: 'parmigiano', type: 'ingredient' },
  { id: '8', value: 'cipolla', type: 'ingredient' },
  { id: '9', value: 'olio oliva', type: 'ingredient' },
  { id: '10', value: 'sale', type: 'ingredient' },
];

// Custom hook for debounced value
function useDebouncedValue(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBar({ 
  placeholder = "Cerca ingredienti o ricette...", 
  onSelectSuggestion,
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const debouncedQuery = useDebouncedValue(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.value.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSelectSuggestion(suggestion.value);
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim()) {
        onSelectSuggestion(query.trim());
        setQuery('');
        setShowSuggestions(false);
      }
      onSearch?.();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleFocus = () => {
    if (query.length > 1 && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search for ingredients or recipes"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          role="combobox"
        />
        
        {showSuggestions && (
          <div className="search-suggestions" role="listbox">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="search-suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected="false"
              >
                {suggestion.value}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button 
        className="filter-button"
        aria-label="Open filters"
        onClick={() => {/* TODO: implement filter functionality */}}
      >
        ☰
      </button>
    </div>
  );
}