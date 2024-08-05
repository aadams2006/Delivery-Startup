import React, { useState, useEffect } from 'react';
import { AlertCircle, Package, Truck, DollarSign, RefreshCcw, MapPin, Clock, Calendar, User, Mail, Phone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const locations = [
  { name: "New York", coords: [40.7128, -74.0060] },
  { name: "Los Angeles", coords: [34.0522, -118.2437] },
  { name: "Chicago", coords: [41.8781, -87.6298] },
  { name: "Houston", coords: [29.7604, -95.3698] },
  { name: "Phoenix", coords: [33.4484, -112.0740] },
];

const HovrP2PDeliveryTool = () => {
  const [user, setUser] = useState(null);
  const [senderLocation, setSenderLocation] = useState(null);
  const [receiverLocation, setReceiverLocation] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [packageInfo, setPackageInfo] = useState({ weight: 1, dimensions: '', description: '' });
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [progress, setProgress] = useState(0);
  const [deliveryType, setDeliveryType] = useState('standard');
  const [insuranceRequired, setInsuranceRequired] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showTrackingDialog, setShowTrackingDialog] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  useEffect(() => {
    if (deliveryStatus === 'in-progress') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            setDeliveryStatus('delivered');
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [deliveryStatus]);

  const handleLogin = () => {
    if (loginCredentials.username === 'user' && loginCredentials.password === 'password') {
      setUser({ name: loginCredentials.username, token: 'fake-jwt-token' });
      setShowLoginDialog(false);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleStartDelivery = () => {
    if (!user) {
      setErrorMessage('Please log in to start a delivery.');
      setShowLoginDialog(true);
      return;
    }

    if (!senderLocation || !receiverLocation) {
      setErrorMessage('Please set both sender and receiver locations.');
      return;
    }

    if (!packageInfo.weight || !packageInfo.dimensions || !packageInfo.description) {
      setErrorMessage('Please provide all package information.');
      return;
    }

    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      setErrorMessage('Please provide all contact information.');
      return;
    }

    setDeliveryStatus('in-progress');
    const deliveryId = 'DEL-' + Math.random().toString(36).substr(2, 9);
    setDeliveryDetails({ 
      deliveryId: deliveryId,
      estimatedTime: Math.floor(Math.random() * 120 + 30) + ' minutes',
      type: deliveryType,
      insurance: insuranceRequired,
      scheduledDate: scheduledDate,
      scheduledTime: scheduledTime,
    });
    setErrorMessage('');
    setProgress(0);
    setTrackingId(deliveryId);
  };

  const handlePayment = () => {
    if (!user) {
      setErrorMessage('Please log in to process payment.');
      setShowLoginDialog(true);
      return;
    }

    setDeliveryStatus('paid');
    setErrorMessage('');
  };

  const handleReset = () => {
    setSenderLocation(null);
    setReceiverLocation(null);
    setDeliveryStatus('idle');
    setErrorMessage('');
    setPackageInfo({ weight: 1, dimensions: '', description: '' });
    setDeliveryDetails(null);
    setProgress(0);
    setDeliveryType('standard');
    setInsuranceRequired(false);
    setScheduledDate('');
    setScheduledTime('');
    setContactInfo({ name: '', email: '', phone: '' });
    setSpecialInstructions('');
    setTrackingId('');
  };

  const handleTracking = () => {
    if (trackingId) {
      setShowTrackingDialog(true);
    } else {
      setErrorMessage('No active delivery to track.');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Hovr P2P Delivery Tool</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="flex justify-between items-center">
              <p className="text-lg">Welcome, <span className="font-semibold">{user.name}</span>!</p>
              <Button variant="outline" onClick={() => setUser(null)}>Log Out</Button>
            </div>
          ) : (
            <Button onClick={() => setShowLoginDialog(true)}>Log In</Button>
          )}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="delivery" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
          <TabsTrigger value="package">Package Details</TabsTrigger>
          <TabsTrigger value="contact">Contact & Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Sender Location</Label>
                    <Select onValueChange={(value) => setSenderLocation(locations.find(loc => loc.name === value).coords)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sender location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.name} value={loc.name}>{loc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Receiver Location</Label>
                    <Select onValueChange={(value) => setReceiverLocation(locations.find(loc => loc.name === value).coords)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select receiver location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.name} value={loc.name}>{loc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Delivery Type</Label>
                  <RadioGroup defaultValue="standard" onValueChange={setDeliveryType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <Label htmlFor="overnight">Overnight</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="insurance" checked={insuranceRequired} onCheckedChange={setInsuranceRequired} />
                  <Label htmlFor="insurance">Insurance Required</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Scheduled Date</Label>
                    <Input type="date" id="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="time">Scheduled Time</Label>
                    <Input type="time" id="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="package">
          <Card>
            <CardHeader>
              <CardTitle>Package Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Slider
                    id="weight"
                    min={0}
                    max={100}
                    step={1}
                    value={[packageInfo.weight]}
                    onValueChange={(value) => setPackageInfo({ ...packageInfo, weight: value[0] })}
                  />
                  <p className="text-right">{packageInfo.weight} kg</p>
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions (LxWxH cm)</Label>
                  <Input
                    id="dimensions"
                    placeholder="e.g., 30x20x10"
                    value={packageInfo.dimensions}
                    onChange={(e) => setPackageInfo({ ...packageInfo, dimensions: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the package"
                    value={packageInfo.description}
                    onChange={(e) => setPackageInfo({ ...packageInfo, description: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information & Special Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any special instructions for the delivery"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mb-6">
        <Button onClick={handleStartDelivery} disabled={deliveryStatus !== 'idle'} className="flex items-center">
          <Truck className="mr-2" /> Start Delivery
        </Button>
        <Button onClick={handlePayment} disabled={deliveryStatus !== 'in-progress'} className="flex items-center">
          <DollarSign className="mr-2" /> Process Payment
        </Button>
        <Button onClick={handleTracking} className="flex items-center">
          <MapPin className="mr-2" /> Track Delivery
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex items-center">
          <RefreshCcw className="mr-2" /> Reset
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Delivery Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Status: <span className="font-semibold">{deliveryStatus}</span></p>
          {deliveryDetails && (
            <div>
              <p>Delivery ID: {deliveryDetails.deliveryId}</p>
              <p>Estimated Time: {deliveryDetails.estimatedTime}</p>
             <p>Type: {deliveryDetails.type}</p>
              <p>Insurance: {deliveryDetails.insurance ? 'Yes' : 'No'}</p>
              <p>Scheduled Date: {deliveryDetails.scheduledDate}</p>
              <p>Scheduled Time: {deliveryDetails.scheduledTime}</p>
            </div>
          )}
          {deliveryStatus === 'in-progress' && (
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-center mt-2">{Math.round(progress)}% Complete</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
            <DialogDescription>
              Enter your credentials to access the delivery tool.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={loginCredentials.username}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleLogin}>Log In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTrackingDialog} onOpenChange={setShowTrackingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Track Your Delivery</DialogTitle>
            <DialogDescription>
              View the current status of your delivery.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p><strong>Tracking ID:</strong> {trackingId}</p>
            <p><strong>Status:</strong> {deliveryStatus}</p>
            {deliveryDetails && (
              <>
                <p><strong>Estimated Time:</strong> {deliveryDetails.estimatedTime}</p>
                <p><strong>Type:</strong> {deliveryDetails.type}</p>
                <p><strong>Insurance:</strong> {deliveryDetails.insurance ? 'Yes' : 'No'}</p>
                <p><strong>Scheduled Date:</strong> {deliveryDetails.scheduledDate}</p>
                <p><strong>Scheduled Time:</strong> {deliveryDetails.scheduledTime}</p>
              </>
            )}
            {deliveryStatus === 'in-progress' && (
              <div className="mt-4">
                <Progress value={progress} className="w-full" />
                <p className="text-center mt-2">{Math.round(progress)}% Complete</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowTrackingDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HovrP2PDeliveryTool;
