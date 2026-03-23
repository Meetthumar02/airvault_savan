import { useState, useEffect } from "react";
import { ArrowRight, Truck, Ship, Plane, Shield, Search, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import heroImage from "@/assets/hero-logistics.jpg";
import airFreight from "@/assets/air-freight.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";
import airTransport from "@/assets/air-transport.jpg";

const backgroundImages = [
  heroImage,
  airFreight,
  seaTransport,
  landTransport,
  airTransport
];

const Hero = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Plane, value: "100+", label: "Destinations" },
    { icon: Truck, value: "31k+", label: "Deliveries" },
    { icon: Clock, value: "99.5%", label: "On Time" },
    { icon: Shield, value: "100%", label: "Secure" },
  ];

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const response = await fetch(
        `https://admin.airvlt.com/api/tracking_api/get_tracking_data?api_company_id=7&customer_code=superadmin&tracking_no=${trackingNumber}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setTrackingData(data[0]);
        setIsOpen(true);
      } else {
        setError("No data found for this tracking number");
      }
    } catch (err) {
      setError("Failed to fetch tracking details. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to safely get the dynamic list (array of arrays or objects)
  const getDynamicList = (data: any) => {
    // Based on user provided format, there seems to be a list of key-value pairs.
    // We look for an array property that contains arrays of strings.
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key].length > 0 && Array.isArray(data[key][0])) {
        return data[key];
      }
    }
    // Fallback: check for 'item_data' if it matches
    if (data.item_data && Array.isArray(data.item_data)) return data.item_data;
    return null;
  };

  // Helper to get history/events
  const getHistory = (data: any) => {
    // Look for array of objects with 'event_at' or 'event_description'
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key].length > 0 && typeof data[key][0] === 'object' && !Array.isArray(data[key][0]) && data[key][0].event_at) {
        return data[key];
      }
    }
    return null;
  };

  const dynamicList = trackingData ? getDynamicList(trackingData) : [];
  const history = trackingData ? getHistory(trackingData) : [];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Professional logistics operations background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentBgIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10  py-20">
        <div className="grid gap-12 items-center">
          <div className="space-y-8 animate-slide-left pl-28">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-secondary/20">
                  🚀 Leading Logistics Solutions
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-[#0D2DD0]">Safe & Reliable</span>
                <br />
                <span className="text-foreground">Logistic Solutions</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Experience world-class logistics services with our comprehensive transport
                solutions. From land to sea to air, we deliver your cargo safely and on time,
                every time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track Parcel Box */}
          {/* <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto animate-fade-in-right mt-8 lg:mt-0">
            <Card className="w-full bg-white/95 backdrop-blur-md shadow-2xl border-t-4 border-t-primary transform hover:scale-[1.02] transition-transform duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  Track Your Shipment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-sm">
                  Enter your tracking number to get real-time updates on your cargo status.
                </p>
                <div className="space-y-4">
                  <div className="relative group">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      placeholder="Enter Tracking Number"
                      className="pl-10 h-12 border-muted hover:border-primary focus:border-primary transition-colors bg-white"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                    onClick={handleTrack}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      "Track Parcel"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>

      {/* Tracking Result Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col w-[95vw] border-none shadow-2xl bg-white/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300 p-0 rounded-2xl">
          <DialogHeader className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b shrink-0">
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <Truck className="h-6 w-6" />
              Shipment Details
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 p-6 space-y-8 custom-scrollbar">
            {trackingData && (
              <>
                {/* Basic Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/40 rounded-xl border hover:border-primary/50 transition-colors duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards" style={{ animationDelay: "0ms" }}>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Tracking No</p>
                    <p className="font-bold text-lg text-foreground tracking-tight">{trackingData.tracking_no}</p>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-xl border hover:border-primary/50 transition-colors duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards" style={{ animationDelay: "100ms" }}>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                      {trackingData.tracking_current_status || trackingData.status || "In Transit"}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-xl border hover:border-primary/50 transition-colors duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards" style={{ animationDelay: "200ms" }}>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Chargeable Weight</p>
                    <p className="font-bold text-lg text-foreground tracking-tight">{trackingData.chargeable_weight || "0.00"}</p>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-xl border hover:border-primary/50 transition-colors duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-backwards" style={{ animationDelay: "300ms" }}>
                    <p className="text-sm font-medium text-muted-foreground mb-1">PCS</p>
                    <p className="font-bold text-lg text-foreground tracking-tight">{trackingData.pcs || "1"}</p>
                  </div>
                </div>

                {/* Additional Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 p-6 bg-muted/20 rounded-xl border animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards" style={{ animationDelay: "350ms" }}>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Forwarding No</p>
                    <p className="font-medium mt-1">{trackingData.forwarding_no || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Forwarding No 2</p>
                    <p className="font-medium mt-1">{trackingData.forwarding_no2 || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reference No</p>
                    <p className="font-medium mt-1">{trackingData.reference_no || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expected Date</p>
                    <p className="font-medium mt-1">{trackingData.expected_datetime || "-"}</p>
                  </div>
                  {/* Forwarding Link */}
                  <div className="col-span-2 md:col-span-4 border-t pt-4 mt-2 flex gap-4 flex-wrap">
                    {trackingData.forwarding_url && (
                      <a href={trackingData.forwarding_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline group">
                        <Search className="h-4 w-4" /> View Forwarder Tracking
                      </a>
                    )}
                    {trackingData.pod_image && (
                      <a href={trackingData.pod_image} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline group">
                        <Shield className="h-4 w-4" /> View POD Image
                      </a>
                    )}
                    {trackingData.pod_signature && (
                      <a href={trackingData.pod_signature} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline group">
                        <Shield className="h-4 w-4" /> View POD Signature
                      </a>
                    )}
                  </div>
                </div>

                {/* Dynamic Details Table */}
                {dynamicList && dynamicList.length > 0 && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards" style={{ animationDelay: "400ms" }}>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      Shipment Information
                    </h3>
                    <div className="border rounded-xl overflow-hidden shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="w-1/3 text-primary font-bold">Parameter</TableHead>
                            <TableHead className="text-primary font-bold">Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dynamicList.map((item: any, index: number) => (
                            <TableRow key={index} className="hover:bg-muted/20 transition-colors">
                              <TableCell className="font-medium text-muted-foreground">{item[0]}</TableCell>
                              <TableCell className="font-medium text-foreground">{item[1]}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* History/Events */}
                {history && history.length > 0 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards" style={{ animationDelay: "500ms" }}>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Tracking History
                    </h3>
                    <div className="relative border rounded-xl overflow-hidden shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="font-semibold">Date & Time</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Location</TableHead>
                            <TableHead className="font-semibold">Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {history.map((event: any, index: number) => (
                            <TableRow key={index} className="hover:bg-muted/20 transition-colors group">
                              <TableCell className="font-medium whitespace-nowrap text-muted-foreground group-hover:text-primary transition-colors">
                                {event.event_at}
                              </TableCell>
                              <TableCell>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${(event.event_state || event.event_remark || "").toLowerCase().includes("delivered")
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : "bg-blue-100 text-blue-700 border border-blue-200"
                                  }`}>
                                  {event.event_state || event.event_remark}
                                </span>
                              </TableCell>
                              <TableCell className="font-medium">{event.event_location}</TableCell>
                              <TableCell className="text-muted-foreground">{event.event_description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
