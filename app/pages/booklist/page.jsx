"use client"
import Providers from '@/app/providers';
import React, { useState, useMemo } from 'react';
import { BiChevronDown, BiBook } from 'react-icons/bi';

// Sample book data
const initialBooks = [
  {
    id: 1,
    kram: 1,
    name: 'आत्मा का सफर',
    author: 'राम शर्मा',
    shreni: 'आध्यात्मिक',
    bhasha: 'हिंदी',
    kimat: 299,
    aavruti: '1st',
    prati: 50
  },
  {
    id: 2,
    kram: 2,
    name: 'Atomic Habits',
    author: 'James Clear',
    shreni: 'Self Help',
    bhasha: 'English',
    kimat: 499,
    aavruti: '2nd',
    prati: 100
  },
  {
    id: 3,
    kram: 3,
    name: 'भगवद गीता',
    author: 'व्यास',
    shreni: 'धार्मिक',
    bhasha: 'संस्कृत',
    kimat: 199,
    aavruti: '10th',
    prati: 25
  },
  {
    id: 4,
    kram: 4,
    name: 'The Power of Now',
    author: 'Eckhart Tolle',
    shreni: 'Self Help',
    bhasha: 'English',
    kimat: 399,
    aavruti: '5th',
    prati: 75
  },
  {
    kram: 5,
    name: 'जीवन का सत्य',
    author: 'विवेकानंद',
    shreni: 'आध्यात्मिक',
    bhasha: 'हिंदी',
    kimat: 350,
    aavruti: '3rd',
    prati: 40
  },
  {
    kram: 6,
    name: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    shreni: 'Self Help',
    bhasha: 'English',
    kimat: 450,
    aavruti: '7th',
    prati: 120
  },
  {
    kram: 7,
    name: 'योग और ध्यान',
    author: 'योगानंद',
    shreni: 'आध्यात्मिक',
    bhasha: 'संस्कृत',
    kimat: 275,
    aavruti: '4th',
    prati: 60
  },
  {
    kram: 8,
    name: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    shreni: 'Self Help',
    bhasha: 'English',
    kimat: 499,
    aavruti: '6th',
    prati: 200
  },
  {
    kram: 9,
    name: 'कर्मयोग',
    author: 'स्वामी विवेकानंद',
    shreni: 'आध्यात्मिक',
    bhasha: 'हिंदी',
    kimat: 325,
    aavruti: '2nd',
    prati: 35
  },
   {
    kram: 10,
    name: 'The 7 Habits of Highly Effective People',
    author: 'Stephen Covey',
    shreni: 'Self Help',
    bhasha: 'English',
    kimat: 550,
    aavruti: '9th',
    prati: 300
  },
  {
    kram: 11,
    name: 'योगसूत्र',
    author: 'पतंजलि',
    shreni: 'धार्मिक',
    bhasha: 'संस्कृत',
    kimat: 180,
    aavruti: '12th',
    prati: 50
  },
  {
    kram: 12,
    name: 'Mindset: The New Psychology of Success',
    author: 'Carol Dweck',
    shreni: 'Self Help',
    bhasha: 'English',
    kimat: 420,
    aavruti: '5th',
    prati: 180
  }
];

const BookTablePage = () => {
  // State for filters
  const [selectedShreni, setSelectedShreni] = useState('');
  const [selectedBhasha, setSelectedBhasha] = useState('');

  // Derive unique categories and languages
  const shreniOptions = [...new Set(initialBooks.map(book => book.shreni))];
  const bhashaOptions = [...new Set(initialBooks.map(book => book.bhasha))];

  // Filtering logic
  const filteredBooks = useMemo(() => {
    return initialBooks.filter(book => {
      const shreniMatch = !selectedShreni || book.shreni === selectedShreni;
      const bhashaMatch = !selectedBhasha || book.bhasha === selectedBhasha;

      return shreniMatch && bhashaMatch;
    });
  }, [selectedShreni, selectedBhasha]);

  // Group books by their category or language
  const groupedBooks = useMemo(() => {
    // If no filter is applied, group by shreni
    if (!selectedShreni && !selectedBhasha) {
      return initialBooks.reduce((acc, book) => {
        if (!acc[book.shreni]) {
          acc[book.shreni] = [];
        }
        acc[book.shreni].push(book);
        return acc;
      }, {});
    }

    // If shreni is selected, filter by shreni
    if (selectedShreni) {
      return {
        [selectedShreni]: filteredBooks
      };
    }

    // If bhasha is selected, filter by bhasha
    if (selectedBhasha) {
      return {
        [selectedBhasha]: filteredBooks
      };
    }
  }, [selectedShreni, selectedBhasha, filteredBooks]);

  return (
    <Providers>
    <div className="min-h-screen bg-gray-50 font-Karma">
      {/* Filters Section */}
      <div className="bg-white shadow-md py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-Teko font-bold text-gray-700">पुस्तक संग्रह</h1>
          <div className="flex space-x-4">
            {/* Shreni (Category) Filter */}
            <div className="relative">
              <select
                value={selectedShreni}
                onChange={(e) => {
                  setSelectedShreni(e.target.value);
                  setSelectedBhasha('');
                }}
                className="appearance-none w-full text-sm bg-white text-gray-800 border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">सभी श्रेणियाँ</option>
                {shreniOptions.map(shreni => (
                  <option key={shreni} value={shreni}>{shreni}</option>
                ))}
              </select>
              <BiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Bhasha (Language) Filter */}
            <div className="relative">
              <select
                value={selectedBhasha}
                onChange={(e) => {
                  setSelectedBhasha(e.target.value);
                  setSelectedShreni('');
                }}
                className="appearance-none w-full text-sm bg-white text-gray-800 border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">सभी भाषाएँ</option>
                {bhashaOptions.map(bhasha => (
                  <option key={bhasha} value={bhasha}>{bhasha}</option>
                ))}
              </select>
              <BiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="container mx-auto px-4 py-8">
        {Object.entries(groupedBooks).length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            कोई पुस्तकें नहीं मिलीं
          </div>
        ) : (
          Object.entries(groupedBooks).map(([category, books]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                {category}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden table-fixed">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">क्रम</th>
                      <th className="w-44 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">नाम</th>
                      <th className="w-36 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">लेखक</th>
                      <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">भाषा</th>
                      <th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">कीमत</th>
                      <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">आवृत्ति</th>
                      <th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">प्रति</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book.kram} className="hover:bg-gray-50 transition-colors">
                        <td className="w-12 px-4 py-3 whitespace-nowrap overflow-hidden truncate">{book.kram}</td>
                        <td className="w-44 px-4 py-3 whitespace-nowrap overflow-hidden truncate" title={book.name}>{book.name}</td>
                        <td className="w-36 px-4 py-3 whitespace-nowrap overflow-hidden truncate" title={book.author}>{book.author}</td>
                        <td className="w-24 px-4 py-3 whitespace-nowrap overflow-hidden truncate">{book.bhasha}</td>
                        <td className="w-20 px-4 py-3 whitespace-nowrap overflow-hidden truncate">₹{book.kimat}</td>
                        <td className="w-24 px-4 py-3 whitespace-nowrap overflow-hidden truncate">{book.aavruti}</td>
                        <td className="w-20 px-4 py-3 whitespace-nowrap overflow-hidden truncate">{book.prati}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </Providers>
  );
};

export default BookTablePage;