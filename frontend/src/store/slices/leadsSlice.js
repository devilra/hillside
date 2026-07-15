import { createSlice } from '@reduxjs/toolkit';
import API_URL from '../../app';

const initialState = {
  list: [],
  loading: false,
  error: null,
  activeTab: 'contact',
  searchTerm: '',
  statusFilter: 'all'
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    fetchLeadsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLeadsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchLeadsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateLeadStatusInList: (state, action) => {
      const { id, status } = action.payload;
      const index = state.list.findIndex(lead => lead.id === id);
      if (index !== -1) {
        state.list[index].status = status;
      }
    },
    deleteLeadFromList: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter(lead => lead.id !== id);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.statusFilter = 'all'; // Reset status filter on tab change
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    clearLeads: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
      state.activeTab = 'contact';
      state.searchTerm = '';
      state.statusFilter = 'all';
    }
  }
});

export const {
  fetchLeadsStart,
  fetchLeadsSuccess,
  fetchLeadsFailure,
  updateLeadStatusInList,
  deleteLeadFromList,
  setActiveTab,
  setSearchTerm,
  setStatusFilter,
  clearLeads
} = leadsSlice.actions;

// Reusable async thunks
export const fetchLeadsAsync = (token) => async (dispatch) => {
  dispatch(fetchLeadsStart());
  try {
    const response = await fetch(`${API_URL}/api/leads`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(fetchLeadsSuccess(data));
    } else {
      dispatch(fetchLeadsFailure(data.message || 'Failed to fetch leads.'));
    }
  } catch (err) {
    dispatch(fetchLeadsFailure('Could not connect to the backend server.'));
  }
};

export const updateLeadStatusAsync = (id, status, token) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/api/leads/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      dispatch(updateLeadStatusInList({ id, status }));
    } else {
      alert('Failed to update lead status.');
    }
  } catch (err) {
    console.error('Error updating status:', err);
  }
};

export const deleteLeadAsync = (id, token) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/api/leads/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      dispatch(deleteLeadFromList(id));
    } else {
      alert('Failed to delete lead.');
    }
  } catch (err) {
    console.error('Error deleting lead:', err);
  }
};

export default leadsSlice.reducer;
