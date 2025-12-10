import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import Layout from '../components/Layout';
import { Screen } from '../types';
import {
    BackIcon,
    ChartNavIcon,
    WalletNavIcon,
    TransferNavIcon,
    HomeNavIcon,
    SettingsNavIcon,
    ShieldIcon,
    LockIcon
} from '../components/Icons';

const MT5AccountScreen = ({ kycLevel, onNavigate }: { kycLevel: number; onNavigate: (s: Screen) => void }) => {
    const { colors, isDark } = useTheme();
    const [hasAccount, setHasAccount] = useState(false); // Set to true to show account details
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [leverage, setLeverage] = useState('1:100');
    const [showPassword, setShowPassword] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const isLevel2Verified = kycLevel >= 2;
    const leverageOptions = ['1:50', '1:100', '1:200', '1:500'];

    // Sample account data
    const accountData = {
        accountNumber: '50012847',
        server: 'FlexyMarketsServer',
        equity: 12450.00,
        balance: 12500.00,
        margin: 1250.00,
        freeMargin: 11200.00,
        marginLevel: '998%',
        leverage: '1:100',
        status: 'Active'
    };

    const handleCreateAccount = () => {
        if (!isLevel2Verified) {
            Alert.alert('Verification Required', 'Level 2 KYC verification is required to create an MT5 account.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Verify Now', onPress: () => onNavigate('kycForm') }
            ]);
            return;
        }

        if (password.length < 8) {
            Alert.alert('Invalid Password', 'Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
            return;
        }

        setIsCreating(true);
        setTimeout(() => {
            setIsCreating(false);
            setHasAccount(true);
            Alert.alert('Account Created', 'Your MT5 Live Account has been created successfully. You can now start trading!');
        }, 2000);
    };

    return (
        <Layout>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16 }}>
                <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.lavender + '15', alignItems: 'center', justifyContent: 'center' }} onPress={() => onNavigate('home')}>
                    <BackIcon dark={isDark} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginLeft: 16 }}>MT5 Account</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {!hasAccount ? (
                    <>
                        {/* KYC Warning if not verified */}
                        {!isLevel2Verified && (
                            <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.red + '10', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.red + '22' }}
                                    onPress={() => onNavigate('kycForm')}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.red + '22', alignItems: 'center', justifyContent: 'center' }}>
                                            <ShieldIcon size={20} />
                                        </View>
                                        <View style={{ marginLeft: 12, flex: 1 }}>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.red }}>Level 2 Verification Required</Text>
                                            <Text style={{ fontSize: 12, color: colors.gray, marginTop: 2 }}>Complete verification to create an MT5 account</Text>
                                        </View>
                                        <BackIcon />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Create Account Info */}
                        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
                            <LinearGradient colors={[colors.lavender, colors.lavenderLight]} style={{ borderRadius: 20, padding: 20, overflow: 'hidden', position: 'relative' }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.black }}>Create MT5 Live Account</Text>
                                <Text style={{ fontSize: 13, color: colors.grayDark, marginTop: 6 }}>Trade forex, commodities, indices, and crypto with our integrated MT5 platform.</Text>
                                <View style={{ flexDirection: 'row', marginTop: 16, flexWrap: 'wrap', gap: 8 }}>
                                    <View style={{ backgroundColor: 'rgba(255,255,255,0.6)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                                        <Text style={{ fontSize: 11, color: colors.grayDark }}>Instant Execution</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'rgba(255,255,255,0.6)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                                        <Text style={{ fontSize: 11, color: colors.grayDark }}>Low Spreads</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'rgba(255,255,255,0.6)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                                        <Text style={{ fontSize: 11, color: colors.grayDark }}>24/5 Trading</Text>
                                    </View>
                                </View>
                                <View style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                            </LinearGradient>
                        </View>

                        {/* Account Creation Form */}
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.black, marginBottom: 16 }}>Account Settings</Text>

                            {/* Password Input */}
                            <View style={{ marginBottom: 16 }}>
                                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.gray, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Trading Password</Text>
                                <View style={{ backgroundColor: isDark ? colors.cardDark : colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.grayLight + '22', flexDirection: 'row', alignItems: 'center' }}>
                                    <TextInput
                                        style={{ flex: 1, padding: 16, fontSize: 15, color: colors.textPrimary }}
                                        placeholder="Min. 8 characters"
                                        placeholderTextColor={colors.gray}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity style={{ paddingRight: 16 }} onPress={() => setShowPassword(!showPassword)}>
                                        <Text style={{ fontSize: 12, color: colors.lavender }}>{showPassword ? 'Hide' : 'Show'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Confirm Password */}
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.gray, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Confirm Password</Text>
                                <View style={{ backgroundColor: isDark ? colors.cardDark : colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.grayLight + '22' }}>
                                    <TextInput
                                        style={{ padding: 16, fontSize: 15, color: colors.textPrimary }}
                                        placeholder="Re-enter password"
                                        placeholderTextColor={colors.gray}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                </View>
                            </View>

                            {/* Leverage Selection */}
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.gray, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Leverage</Text>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    {leverageOptions.map((lev) => (
                                        <TouchableOpacity
                                            key={lev}
                                            style={{
                                                flex: 1,
                                                paddingVertical: 14,
                                                borderRadius: 12,
                                                backgroundColor: leverage === lev ? colors.lavender : colors.white,
                                                borderWidth: 1,
                                                borderColor: leverage === lev ? colors.lavender : (isDark ? colors.grayLight + '22' : colors.grayLight + '22'),
                                                alignItems: 'center'
                                            }}
                                            onPress={() => setLeverage(lev)}
                                        >
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: leverage === lev ? colors.black : colors.grayDark }}>{lev}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Text style={{ fontSize: 11, color: colors.gray, marginTop: 8 }}>Higher leverage increases both potential profits and risks</Text>
                            </View>

                            {/* Account Type Info */}
                            <View style={{ backgroundColor: colors.cardDark, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.grayLight + '22', marginBottom: 20 }}>
                                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Account Details</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <Text style={{ fontSize: 12, color: colors.gray }}>Account Type</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.grayDark }}>MT5 Live</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <Text style={{ fontSize: 12, color: colors.gray }}>Server</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.grayDark }}>FlexyMarketsServer</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <Text style={{ fontSize: 12, color: colors.gray }}>Currency</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.grayDark }}>USD</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, color: colors.gray }}>Min. Deposit</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.grayDark }}>$100</Text>
                                </View>
                            </View>

                            {/* Create Button */}
                            <TouchableOpacity
                                style={{
                                    backgroundColor: isLevel2Verified ? colors.lavender : colors.grayLight,
                                    borderRadius: 14,
                                    paddingVertical: 16,
                                    alignItems: 'center',
                                    opacity: isLevel2Verified ? 1 : 0.6
                                }}
                                onPress={handleCreateAccount}
                                disabled={isCreating}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '600', color: isLevel2Verified ? colors.black : colors.gray }}>
                                    {isCreating ? 'Creating Account...' : 'Create MT5 Account'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        {/* Account Details View */}
                        <View style={{ marginHorizontal: 16 }}>
                            {/* Account Card */}
                            <LinearGradient colors={[colors.cardDark, colors.cardLight]} style={{ borderRadius: 20, padding: 20, marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.lavender + '22', alignItems: 'center', justifyContent: 'center' }}>
                                            <ChartNavIcon />
                                        </View>
                                        <View style={{ marginLeft: 12 }}>
                                            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.white }}>MT5 Live Account</Text>
                                            <Text style={{ fontSize: 12, color: colors.gray }}>{accountData.server}</Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: colors.green + '22', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 }}>
                                        <Text style={{ fontSize: 11, fontWeight: '600', color: colors.green }}>{accountData.status}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.cardLight }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 11, color: colors.gray }}>Account</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.white, marginTop: 4 }}>{accountData.accountNumber}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 11, color: colors.gray }}>Equity</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.green, marginTop: 4 }}>${accountData.equity.toLocaleString()}</Text>
                                    </View>
                                </View>
                            </LinearGradient>

                            {/* Account Stats */}
                            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
                                <View style={{ flex: 1, backgroundColor: isDark ? colors.cardDark : colors.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.grayLight + '22' }}>
                                    <Text style={{ fontSize: 11, color: colors.gray }}>Balance</Text>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginTop: 4 }}>${accountData.balance.toLocaleString()}</Text>
                                </View>
                                <View style={{ flex: 1, backgroundColor: isDark ? colors.cardDark : colors.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.grayLight + '22' }}>
                                    <Text style={{ fontSize: 11, color: colors.gray }}>Free Margin</Text>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginTop: 4 }}>${accountData.freeMargin.toLocaleString()}</Text>
                                </View>
                            </View>

                            {/* Account Info */}
                            <View style={{ backgroundColor: colors.cardDark, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.grayLight + '22', marginBottom: 20 }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 16 }}>Account Information</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <Text style={{ fontSize: 13, color: colors.gray }}>Account Number</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.grayDark }}>{accountData.accountNumber}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <Text style={{ fontSize: 13, color: colors.gray }}>Server</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.grayDark }}>{accountData.server}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <Text style={{ fontSize: 13, color: colors.gray }}>Leverage</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.grayDark }}>{accountData.leverage}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <Text style={{ fontSize: 13, color: colors.gray }}>Margin Used</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.grayDark }}>${accountData.margin.toLocaleString()}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 13, color: colors.gray }}>Margin Level</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.green }}>{accountData.marginLevel}</Text>
                                </View>
                            </View>

                            {/* Actions */}
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity
                                    style={{ flex: 1, backgroundColor: colors.lavender, borderRadius: 14, paddingVertical: 14, alignItems: 'center' }}
                                    onPress={() => onNavigate('deposit')}
                                >
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.black }}>Deposit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flex: 1, backgroundColor: isDark ? colors.cardDark : colors.white, borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.lavender }}
                                    onPress={() => onNavigate('withdraw')}
                                >
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.lavender }}>Withdraw</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Change Password */}
                            <TouchableOpacity style={{ backgroundColor: colors.cardDark, borderRadius: 14, padding: 16, marginTop: 16, borderWidth: 1, borderColor: colors.grayLight + '22', flexDirection: 'row', alignItems: 'center' }}>
                                <LockIcon size={20} />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>Change Trading Password</Text>
                                    <Text style={{ fontSize: 12, color: colors.gray }}>Update your MT5 password</Text>
                                </View>
                                <BackIcon dark={isDark} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* Bottom Nav */}
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 70, backgroundColor: isDark ? colors.cardDark : colors.white, paddingHorizontal: 8, paddingBottom: 8, borderTopWidth: 1, borderTopColor: colors.grayLight + '22' }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('wallet')}><WalletNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('transfer')}><TransferNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('home')}><HomeNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('plans')}><ChartNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('settings')}><SettingsNavIcon /></TouchableOpacity>
            </View>
        </Layout>
    );
};

export default MT5AccountScreen;
