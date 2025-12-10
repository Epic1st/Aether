import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext, lightColors, darkColors, ThemeMode } from './theme/ThemeContext';
import { Screen } from './types';

// Screens
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import KYCFormScreen from './screens/KYCFormScreen';
import WalletScreen from './screens/WalletScreen';
import TransferScreen from './screens/TransferScreen';
import PlansScreen from './screens/PlansScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import SettingsScreen from './screens/SettingsScreen';
import PersonalDataScreen from './screens/PersonalDataScreen';
import DepositScreen from './screens/DepositScreen';
import MT5AccountScreen from './screens/MT5AccountScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import TradesScreen from './screens/TradesScreen';
import SecurityScreen from './screens/SecurityScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';

// ============ MAIN APP ============
export default function App() {
    const [screen, setScreen] = useState<Screen>('splash');
    const [kycStatus, setKycStatus] = useState<'none' | 'pending' | 'approved'>('none');
    const [kycLevel, setKycLevel] = useState(0); // 0 = none, 1 = basic (deposit), 2 = full (withdraw)
    const [themeMode, setThemeMode] = useState<ThemeMode>('system');

    // Detect device color scheme
    const systemColorScheme = useColorScheme();

    // Compute effective theme
    const isDark = themeMode === 'system'
        ? systemColorScheme === 'dark'
        : themeMode === 'dark';

    const themeColors = isDark ? darkColors : lightColors;

    const handleNavigate = (s: Screen) => setScreen(s);

    const handleKycComplete = () => {
        if (kycLevel === 0) {
            setKycLevel(1);
            setKycStatus('pending');
        } else if (kycLevel === 1) {
            setKycLevel(2);
            setKycStatus('approved');
        }
        setScreen('wallet');
    };

    const themeContextValue = {
        colors: themeColors,
        isDark,
        themeMode,
        setThemeMode,
    };

    const renderScreen = () => {
        switch (screen) {
            case 'splash': return <SplashScreen onComplete={() => setScreen('welcome')} />;
            case 'welcome': return <WelcomeScreen onLogin={() => setScreen('login')} onSignup={() => setScreen('signup')} />;
            case 'login': return <LoginScreen onBack={() => setScreen('welcome')} onLogin={() => setScreen('home')} onSignup={() => setScreen('signup')} />;
            case 'signup': return <SignupScreen onBack={() => setScreen('welcome')} onSignup={() => setScreen('home')} onLogin={() => setScreen('login')} />;
            case 'kycForm': return <KYCFormScreen kycLevel={kycLevel} onSubmit={handleKycComplete} onBack={() => setScreen('wallet')} onNavigate={handleNavigate} />;
            case 'home': return <HomeScreen kycStatus={kycStatus} onNavigate={handleNavigate} />;
            case 'wallet': return <WalletScreen kycLevel={kycLevel} onNavigate={handleNavigate} />;
            case 'transfer': return <TransferScreen onNavigate={handleNavigate} />;
            case 'plans': return <PlansScreen onNavigate={handleNavigate} />;
            case 'withdraw': return <WithdrawScreen kycStatus={kycStatus} onNavigate={handleNavigate} />;
            case 'settings': return <SettingsScreen kycStatus={kycStatus} onNavigate={handleNavigate} />;
            case 'personalData': return <PersonalDataScreen onNavigate={handleNavigate} />;
            case 'deposit': return <DepositScreen onNavigate={handleNavigate} />;
            case 'mt5Account': return <MT5AccountScreen kycLevel={kycLevel} onNavigate={handleNavigate} />;
            case 'trades': return <TradesScreen onNavigate={handleNavigate} />;
            case 'security': return <SecurityScreen onNavigate={handleNavigate} />;
            case 'accountSettings': return <AccountSettingsScreen onNavigate={handleNavigate} />;
            default: return <HomeScreen kycStatus={kycStatus} onNavigate={handleNavigate} />;
        }
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {renderScreen()}
        </ThemeContext.Provider>
    );
}
