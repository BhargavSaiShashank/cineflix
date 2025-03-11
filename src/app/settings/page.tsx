"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import LanguageSelector from '@/components/settings/LanguageSelector';
import { 
  Globe, 
  Bell, 
  Shield, 
  Eye, 
  Monitor, 
  Volume2, 
  User, 
  CreditCard,
  Save,
  Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [videoQuality, setVideoQuality] = useState([720]);
  const [volume, setVolume] = useState([80]);
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Please sign in to access settings</p>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account preferences and settings</p>
        </div>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-5 max-w-3xl mb-8 bg-[#1e293b]">
            <TabsTrigger value="account" className="data-[state=active]:bg-pink-500">
              <User className="h-4 w-4 mr-2" /> Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-pink-500">
              <Monitor className="h-4 w-4 mr-2" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-pink-500">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="playback" className="data-[state=active]:bg-pink-500">
              <Volume2 className="h-4 w-4 mr-2" /> Playback
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-pink-500">
              <Shield className="h-4 w-4 mr-2" /> Privacy
            </TabsTrigger>
          </TabsList>
          
          {/* Account Settings */}
          <TabsContent value="account">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-[#1e293b] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your account details and personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input 
                      id="name" 
                      defaultValue={user.name || ""}
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email" 
                      defaultValue={user.email || ""}
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input 
                      id="username" 
                      defaultValue={user.username || ""}
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full mt-4">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1e293b] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Language & Region</CardTitle>
                  <CardDescription className="text-gray-400">
                    Set your preferred language and regional settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-white">Display Language</Label>
                    <div className="mt-2">
                      <LanguageSelector variant="default" className="w-full" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      This changes the language of the user interface
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-white">Content Region</Label>
                    <select 
                      id="region" 
                      className="w-full bg-[#0f172a] border border-gray-700 rounded-md p-2 text-white"
                    >
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="eu">Europe</option>
                      <option value="as">Asia</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-2">
                      This affects what content is available to you
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitles" className="text-white">Preferred Subtitle Language</Label>
                    <select 
                      id="subtitles" 
                      className="w-full bg-[#0f172a] border border-gray-700 rounded-md p-2 text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1e293b] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Subscription</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your subscription plan and payment details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 rounded-lg border border-pink-500/30 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold">Premium Plan</h3>
                      <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Your subscription renews on <span className="text-white font-medium">October 15, 2023</span>
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Payment Method</h4>
                        <div className="flex items-center mt-1">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-300 text-sm">•••• •••• •••• 4242</span>
                        </div>
                      </div>
                      <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                        Update
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800">
                      <Button variant="outline" className="border-red-800 text-red-500 hover:bg-red-900/20 hover:text-red-400 w-full">
                        <Trash2 className="h-4 w-4 mr-2" /> Cancel Subscription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1e293b] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Security</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account security and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-white">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password"
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-white">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password"
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full mt-4">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card className="bg-[#1e293b] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Display Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize how CineFlix looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Dark Mode</Label>
                    <p className="text-sm text-gray-400">
                      Use dark theme throughout the application
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">High Contrast</Label>
                    <p className="text-sm text-gray-400">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Reduce Animations</Label>
                    <p className="text-sm text-gray-400">
                      Minimize motion effects throughout the interface
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-800">
                  <Label className="text-white">Text Size</Label>
                  <Slider
                    defaultValue={[100]}
                    min={75}
                    max={150}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Smaller</span>
                    <span>Default</span>
                    <span>Larger</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card className="bg-[#1e293b] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Control what notifications you receive and how
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Push Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Receive notifications on your device
                    </p>
                  </div>
                  <Switch 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Marketing Emails</Label>
                    <p className="text-sm text-gray-400">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <Switch 
                    checked={marketingEmails} 
                    onCheckedChange={setMarketingEmails} 
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-white font-medium mb-4">Notify me about:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="new-releases" 
                        className="rounded border-gray-700 bg-[#0f172a] text-pink-500 focus:ring-pink-500"
                        defaultChecked
                      />
                      <Label htmlFor="new-releases" className="text-gray-300 ml-2">
                        New releases of movies I might like
                      </Label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="friend-activity" 
                        className="rounded border-gray-700 bg-[#0f172a] text-pink-500 focus:ring-pink-500"
                        defaultChecked
                      />
                      <Label htmlFor="friend-activity" className="text-gray-300 ml-2">
                        Friend activity (reviews, watchlists)
                      </Label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="watchlist-updates" 
                        className="rounded border-gray-700 bg-[#0f172a] text-pink-500 focus:ring-pink-500"
                        defaultChecked
                      />
                      <Label htmlFor="watchlist-updates" className="text-gray-300 ml-2">
                        Updates to movies in my watchlist
                      </Label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="recommendations" 
                        className="rounded border-gray-700 bg-[#0f172a] text-pink-500 focus:ring-pink-500"
                        defaultChecked
                      />
                      <Label htmlFor="recommendations" className="text-gray-300 ml-2">
                        Personalized recommendations
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Playback Settings */}
          <TabsContent value="playback">
            <Card className="bg-[#1e293b] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Playback Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your viewing experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Autoplay</Label>
                    <p className="text-sm text-gray-400">
                      Automatically play the next episode or recommended content
                    </p>
                  </div>
                  <Switch 
                    checked={autoplay} 
                    onCheckedChange={setAutoplay} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Subtitles</Label>
                    <p className="text-sm text-gray-400">
                      Show subtitles by default when available
                    </p>
                  </div>
                  <Switch 
                    checked={subtitlesEnabled} 
                    onCheckedChange={setSubtitlesEnabled} 
                  />
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-800">
                  <div className="flex justify-between">
                    <Label className="text-white">Video Quality</Label>
                    <span className="text-gray-300">{videoQuality[0]}p</span>
                  </div>
                  <Slider
                    value={videoQuality}
                    onValueChange={setVideoQuality}
                    min={360}
                    max={1080}
                    step={360}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>360p</span>
                    <span>720p</span>
                    <span>1080p</span>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-800">
                  <div className="flex justify-between">
                    <Label className="text-white">Default Volume</Label>
                    <span className="text-gray-300">{volume[0]}%</span>
                  </div>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-white font-medium mb-4">Playback Speed</h3>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {['0.5x', '0.75x', '1x', '1.25x', '1.5x'].map((speed) => (
                      <Button 
                        key={speed}
                        variant={speed === '1x' ? 'default' : 'outline'}
                        className={speed === '1x' 
                          ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                          : 'border-gray-700 text-gray-300 hover:text-white'
                        }
                      >
                        {speed}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card className="bg-[#1e293b] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Privacy Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Control your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Public Profile</Label>
                    <p className="text-sm text-gray-400">
                      Allow others to view your profile and activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Show Watching Activity</Label>
                    <p className="text-sm text-gray-400">
                      Share what you're watching with friends
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Personalized Recommendations</Label>
                    <p className="text-sm text-gray-400">
                      Allow us to use your viewing history for recommendations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Data Collection</Label>
                    <p className="text-sm text-gray-400">
                      Allow us to collect usage data to improve our service
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <Button variant="outline" className="border-red-800 text-red-500 hover:bg-red-900/20 hover:text-red-400">
                    Download My Data
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Request a copy of all data associated with your account
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <Button variant="outline" className="border-red-800 text-red-500 hover:bg-red-900/20 hover:text-red-400">
                    Delete Account
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Permanently delete your account and all associated data
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 