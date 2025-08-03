import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import AddExpense from "./AddExpense";

import Onboarding from "./Onboarding";

import Settings from "./Settings";

import Calendar from "./Calendar";

import Accounts from "./Accounts";

import Income from "./Income";

import Subscriptions from "./Subscriptions";

import Home from "./Home";

import Deals from "./Deals";

import Receipts from "./Receipts";

import AICoach from "./AICoach";

import Privacy from "./Privacy";

import Contact from "./Contact";

import Pricing from "./Pricing";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    AddExpense: AddExpense,
    
    Onboarding: Onboarding,
    
    Settings: Settings,
    
    Calendar: Calendar,
    
    Accounts: Accounts,
    
    Income: Income,
    
    Subscriptions: Subscriptions,
    
    Home: Home,
    
    Deals: Deals,
    
    Receipts: Receipts,
    
    AICoach: AICoach,
    
    Privacy: Privacy,
    
    Contact: Contact,
    
    Pricing: Pricing,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/AddExpense" element={<AddExpense />} />
                
                <Route path="/Onboarding" element={<Onboarding />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/Calendar" element={<Calendar />} />
                
                <Route path="/Accounts" element={<Accounts />} />
                
                <Route path="/Income" element={<Income />} />
                
                <Route path="/Subscriptions" element={<Subscriptions />} />
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Deals" element={<Deals />} />
                
                <Route path="/Receipts" element={<Receipts />} />
                
                <Route path="/AICoach" element={<AICoach />} />
                
                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}