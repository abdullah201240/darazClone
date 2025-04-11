'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Upload } from 'lucide-react';
import { Eye } from 'lucide-react';

export default function ProfilePage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Please upload a JPG, PNG, or GIF file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="address">Addresses</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-center relative">
                <div 
                  className="relative group"
                  onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                >
                  <div className="relative">
                    <Avatar className="h-24 w-24 cursor-pointer hover:opacity-80 transition-opacity">
                      <AvatarImage src={previewImage || "https://github.com/shadcn.png"} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30 rounded-full">
                      <span className="text-white font-medium">Click to edit</span>
                    </div>
                  </div>
                  
                  {showPhotoOptions && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-2 flex flex-col space-y-2 z-10 border border-gray-200">
                      <button 
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerFileInput();
                          setShowPhotoOptions(false);
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Change Photo
                      </button>
                      {previewImage && (
                        <button 
                          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(previewImage, '_blank');
                            setShowPhotoOptions(false);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Photo
                        </button>
                      )}
                      <button 
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md transition-colors flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPhotoOptions(false);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    aria-label="Profile photo upload"
                    title="Select profile photo"
                  />
                  <p className="text-sm text-muted-foreground">
                    Click on photo to edit (JPG, PNG or GIF under 2MB)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+880 1234 567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">Date of Birth</Label>
                  <Input id="birthday" type="date" defaultValue="1990-01-01" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Preferences</h3>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    aria-label="Select language"
                  >
                    <option>English</option>
                    <option>Bengali</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    aria-label="Select theme"
                  >
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="email-notifications" 
                      defaultChecked 
                      title="Toggle email notifications"
                      aria-label="Toggle email notifications"
                    />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="sms-notifications" 
                      defaultChecked 
                      title="Toggle SMS notifications"
                      aria-label="Toggle SMS notifications"
                    />
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="push-notifications" 
                      title="Toggle push notifications"
                      aria-label="Toggle push notifications"
                    />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Address Tab */}
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Address Book</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input id="address1" defaultValue="123 Main Street" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input id="address2" defaultValue="Apt 4B" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Dhaka" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Region</Label>
                  <Input id="state" defaultValue="Dhaka Division" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Postal Code</Label>
                  <Input id="zip" defaultValue="1207" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select 
                    id="country" 
                    className="w-full p-2 border rounded-md"
                    aria-label="Select country"
                  >
                    <option>Bangladesh</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="default-address" 
                  defaultChecked 
                  title="Set as default shipping address"
                  aria-label="Set as default shipping address"
                />
                <Label htmlFor="default-address">Set as default shipping address</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add New Address</Button>
              <Button>Save Address</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">Verify via text message</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
