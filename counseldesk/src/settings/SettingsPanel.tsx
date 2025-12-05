import React from 'react';
import { DashboardLayout } from '@/co';
import {
    User,
    Bell,
    Shield,
    Building2,
    Mail,
    Lock,
    Smartphone,
} from 'lucide-react';
import { toast } from 'sonner';
import './Settings.scss';

export default function Settings() {
    const handleSave = () => {
        toast.success('Settings saved successfully');
    };

    return (
        <DashboardLayout
            title="Settings"
            subtitle="Manage your account and preferences"
        >
            <div className="settings-container">
                {/* Profile */}
                <section className="settings-card fade-in">
                    <header className="settings-card-header">
                        <div className="section-title">
                            <User size={18} />
                            <h3>Profile</h3>
                        </div>
                        <p>Manage your personal information</p>
                    </header>

                    <div className="settings-card-body">
                        <div className="profile-row">
                            <div className="avatar">
                                <div className="avatar-fallback">JD</div>
                            </div>

                            <div>
                                <button className="btn-outline small">Change Photo</button>
                                <p className="hint">JPG, PNG or GIF. Max 5MB.</p>
                            </div>
                        </div>

                        <div className="two-grid">
                            <div className="field">
                                <label>First Name</label>
                                <input defaultValue="John" />
                            </div>

                            <div className="field">
                                <label>Last Name</label>
                                <input defaultValue="Doe" />
                            </div>

                            <div className="field">
                                <label>Email</label>
                                <input type="email" defaultValue="john.doe@lawfirm.com" />
                            </div>

                            <div className="field">
                                <label>Phone</label>
                                <input type="tel" defaultValue="(555) 123-4567" />
                            </div>
                        </div>

                        <div className="field">
                            <label>Bio</label>
                            <input defaultValue="Senior Partner specializing in Corporate Law" />
                        </div>
                    </div>
                </section>

                {/* Firm Info */}
                <section className="settings-card fade-in delay-1">
                    <header className="settings-card-header">
                        <div className="section-title">
                            <Building2 size={18} />
                            <h3>Firm Information</h3>
                        </div>
                        <p>Your law firm details</p>
                    </header>

                    <div className="settings-card-body">
                        <div className="two-grid">
                            <div className="field">
                                <label>Firm Name</label>
                                <input defaultValue="Doe & Associates LLP" />
                            </div>

                            <div className="field">
                                <label>Bar Number</label>
                                <input defaultValue="123456" />
                            </div>

                            <div className="field full">
                                <label>Address</label>
                                <input defaultValue="123 Legal Street, Suite 400, New York, NY 10001" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="settings-card fade-in delay-2">
                    <header className="settings-card-header">
                        <div className="section-title">
                            <Bell size={18} />
                            <h3>Notifications</h3>
                        </div>
                        <p>Configure how you receive updates</p>
                    </header>

                    <div className="settings-card-body">
                        {[
                            {
                                label: 'Email Notifications',
                                text: 'Receive email updates about case activities',
                                checked: true,
                            },
                            {
                                label: 'Appointment Reminders',
                                text: 'Get reminded about upcoming appointments',
                                checked: true,
                            },
                            {
                                label: 'Deadline Alerts',
                                text: 'Be notified about approaching deadlines',
                                checked: true,
                            },
                            {
                                label: 'Mobile Push Notifications',
                                text: 'Receive push notifications on your phone',
                                checked: false,
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="toggle-row">
                                <div>
                                    <label>{item.label}</label>
                                    <p className="hint">{item.text}</p>
                                </div>
                                <input type="checkbox" defaultChecked={item.checked} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security */}
                <section className="settings-card fade-in delay-3">
                    <header className="settings-card-header">
                        <div className="section-title">
                            <Shield size={18} />
                            <h3>Security</h3>
                        </div>
                        <p>Protect your account</p>
                    </header>

                    <div className="settings-card-body">
                        <div className="security-row">
                            <div className="icon-box">
                                <Lock size={18} />
                            </div>
                            <div>
                                <label>Password</label>
                                <p className="hint">Last changed 30 days ago</p>
                            </div>

                            <button className="btn-outline small">Change Password</button>
                        </div>

                        <hr />

                        <div className="security-row">
                            <div className="icon-box">
                                <Smartphone size={18} />
                            </div>
                            <div>
                                <label>Two-Factor Authentication</label>
                                <p className="hint">Add an extra layer of security</p>
                            </div>

                            <button className="btn-outline small">Enable 2FA</button>
                        </div>

                        <hr />

                        <div className="security-row">
                            <div className="icon-box">
                                <Mail size={18} />
                            </div>
                            <div>
                                <label>Recovery Email</label>
                                <p className="hint">backup@email.com</p>
                            </div>

                            <button className="btn-outline small">Update</button>
                        </div>
                    </div>
                </section>

                {/* Save Button */}
                <div className="actions">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-gold" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
