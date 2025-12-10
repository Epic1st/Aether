import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
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
    LockIcon
} from '../components/Icons';

const PersonalDataScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
    const { colors, isDark } = useTheme();
    const [username, setUsername] = useState('aether_user');
    const [fullName, setFullName] = useState('User Name');
    const [email, setEmail] = useState('user@example.com');
    const [phone, setPhone] = useState('+1 234 567 8900');
    const [dateOfBirth, setDateOfBirth] = useState('1990-01-15');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        Alert.alert('Profile Updated', 'Your personal information has been saved successfully.');
        setIsEditing(false);
    };

    const InputField = ({ label, value, onChangeText, editable = true, keyboardType = 'default' as any }: { label: string; value: string; onChangeText: (text: string) => void; editable?: boolean; keyboardType?: any }) => (
        <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.gray, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Text>
            <View style={{ backgroundColor: colors.cardDark, borderRadius: 14, borderWidth: 1, borderColor: isEditing ? colors.lavender + '44' : colors.grayLight + '22' }}>
                <TextInput
                    style={{ padding: 16, fontSize: 15, color: colors.textPrimary }}
                    value={value}
                    onChangeText={onChangeText}
                    editable={isEditing && editable}
                    keyboardType={keyboardType}
                    placeholderTextColor={colors.gray}
                />
            </View>
        </View>
    );

    return (
        <Layout>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16 }}>
                <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.lavender + '15', alignItems: 'center', justifyContent: 'center' }} onPress={() => onNavigate('settings')}>
                    <BackIcon dark={isDark} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginLeft: 16 }}>Personal Data</Text>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.lavender }}>{isEditing ? 'Cancel' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
                {/* Profile Avatar Section */}
                <View style={{ alignItems: 'center', paddingVertical: 24 }}>
                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.lavender + '22', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.lavender + '44' }}>
                        <Text style={{ fontSize: 40, fontWeight: '700', color: colors.lavender }}>{fullName.charAt(0).toUpperCase()}</Text>
                    </View>
                    {isEditing && (
                        <TouchableOpacity style={{ marginTop: 12, backgroundColor: colors.lavender + '15', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
                            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.lavender }}>Change Photo</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Form Fields */}
                <View style={{ paddingHorizontal: 16 }}>
                    {/* Username Field - Special styling */}
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.gray, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Username</Text>
                        <View style={{ backgroundColor: colors.cardDark, borderRadius: 14, borderWidth: 1, borderColor: isEditing ? colors.lavender + '44' : colors.grayLight + '22', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ paddingLeft: 16, fontSize: 15, color: colors.gray }}>@</Text>
                            <TextInput
                                style={{ flex: 1, padding: 16, paddingLeft: 4, fontSize: 15, color: colors.textPrimary }}
                                value={username}
                                onChangeText={setUsername}
                                editable={isEditing}
                                placeholderTextColor={colors.gray}
                            />
                        </View>
                        {isEditing && (
                            <Text style={{ fontSize: 11, color: colors.gray, marginTop: 6 }}>Username must be unique and can only contain letters, numbers, and underscores</Text>
                        )}
                    </View>

                    <InputField label="Full Name" value={fullName} onChangeText={setFullName} />
                    <InputField label="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <InputField label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    <InputField label="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} editable={false} />

                    {/* Account Info */}
                    <View style={{ backgroundColor: colors.lavender + '10', borderRadius: 14, padding: 16, marginTop: 8 }}>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.black, marginBottom: 8 }}>Account Information</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ fontSize: 12, color: colors.gray }}>Member Since</Text>
                            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.grayDark }}>January 2024</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 12, color: colors.gray }}>Account ID</Text>
                            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.grayDark }}>#AE-2024-0001</Text>
                        </View>
                    </View>

                    {/* Security Notice */}
                    <View style={{ backgroundColor: colors.cardDark, borderRadius: 14, padding: 16, marginTop: 16, borderWidth: 1, borderColor: colors.grayLight + '22' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <LockIcon size={16} />
                            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginLeft: 8 }}>Privacy & Security</Text>
                        </View>
                        <Text style={{ fontSize: 11, color: colors.gray, lineHeight: 16 }}>Your personal data is encrypted and stored securely. We never share your information with third parties.</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Save Button - Fixed at bottom when editing */}
            {isEditing && (
                <View style={{ position: 'absolute', bottom: 70, left: 0, right: 0, paddingHorizontal: 16, paddingVertical: 16, backgroundColor: colors.lavenderBg, borderTopWidth: 1, borderTopColor: colors.grayLight + '22' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.lavender, borderRadius: 14, paddingVertical: 16, alignItems: 'center' }}
                        onPress={handleSave}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.black }}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Bottom Nav */}
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 70, backgroundColor: isDark ? colors.cardDark : colors.white, paddingHorizontal: 8, paddingBottom: 8, borderTopWidth: 1, borderTopColor: colors.grayLight + '22' }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('wallet')}><WalletNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('transfer')}><TransferNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('home')}><HomeNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => onNavigate('plans')}><ChartNavIcon /></TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 56, height: 56 }}><View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: colors.lavender, alignItems: 'center', justifyContent: 'center' }}><SettingsNavIcon /></View></TouchableOpacity>
            </View>
        </Layout>
    );
};

export default PersonalDataScreen;
