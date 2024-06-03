import React, { useState, useEffect } from 'react';
import { fetchTopUsers, searchUser } from '@/actions/userActions';
import { HashLoader } from 'react-spinners';
import Link from 'next/link';

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopProfiles = async () => {
      try {
        const topProfiles = await fetchTopUsers();
        setProfiles(Array.isArray(topProfiles) ? topProfiles : []);
      } catch (error) {
        console.error('Error fetching top profiles:', error);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };
    loadTopProfiles();
  }, []);

  useEffect(() => {
    const filterProfiles = async () => {
      if (searchTerm.trim() === '') {
        setFilteredProfiles([]);
        return;
      }

      try {
        const searchResults = await searchUser(searchTerm);
        setFilteredProfiles(Array.isArray(searchResults) ? searchResults : []);
      } catch (error) {
        console.error('Error fetching profiles based on search term:', error);
        setFilteredProfiles([]);
      }
    };
    filterProfiles();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Top Profiles</h1>
      </header>
      <div className="mb-4">
        <input type="text" className="w-full p-2 border border-gray-300 rounded text-black" placeholder="Search by username or name" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <HashLoader color={"#ffffff"} loading={loading} size={30} />
          </div>
        ) : searchTerm.trim() ? (
          filteredProfiles.length > 0 ? (
            // Search profiles
            <ul>
              {filteredProfiles.map((profile) => (
                <Link href={`/${profile.username}`}>
                  <li key={profile.username} className="mb-4 p-4 border border-gray-200 rounded">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-slate-200">@{profile.username}</p>
                    <p className="text-gray-200">Project: {profile.project || "! Nothing here"}</p>
                    <p className="text-sm text-gray-100">Raised Funds: {profile.raisedFunds}</p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>No such chai lover exists</p>
          )
        ) : (
          // Top Profiles
          <>
            <div className='my-5 font-bold'><p className='text-xl'>Top Fund Raisers</p></div>
            <ul>
              {profiles.map((profile) => (
                <Link href={`/${profile.username}`}>
                  <li key={profile.username} className="mb-4 p-4 border border-gray-200 rounded">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-slate-200">@{profile.username}</p>
                    <p className="text-gray-200">Project: {profile.project || "! Nothing here"}</p>
                    <p className="text-sm text-gray-100">Raised Funds: {profile.raisedFunds}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilesPage;
