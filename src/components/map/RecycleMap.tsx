import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Phone, Clock, Recycle, Trash2, Leaf, Search, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (color: string) =>
  L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const recycleIcon = createCustomIcon("#2c7a45");
const ewasteIcon = createCustomIcon("#3b82f6");
const compostIcon = createCustomIcon("#84cc16");

interface RecycleHub {
  id: string;
  name: string;
  type: "recycling" | "e-waste" | "composting";
  address: string;
  phone: string;
  hours: string;
  description: string;
  lat: number;
  lng: number;
}

const recycleHubs: RecycleHub[] = [
  {
    id: "1",
    name: "Saahas Zero Waste",
    type: "recycling",
    address: "JP Nagar, Bengaluru",
    phone: "080-2222-1199",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    description: "Accepts paper, plastic, metal, e-waste, and household hazardous waste",
    lat: 12.9082,
    lng: 77.5929,
  },
  {
    id: "2",
    name: "E-Parisaraa",
    type: "e-waste",
    address: "Electronic City, Bengaluru",
    phone: "080-2852-1533",
    hours: "Mon-Fri: 10:00 AM - 5:00 PM",
    description: "Specializes in electronic waste recycling and refurbishment",
    lat: 12.8456,
    lng: 77.6603,
  },
  {
    id: "3",
    name: "Hasiru Dala",
    type: "recycling",
    address: "Jayanagar, Bengaluru",
    phone: "080-2663-7911",
    hours: "Daily: 8:00 AM - 8:00 PM",
    description: "Community recycling center with waste picker integration",
    lat: 12.9294,
    lng: 77.5831,
  },
  {
    id: "4",
    name: "Terra Firma Bio Technologies",
    type: "composting",
    address: "Whitefield, Bengaluru",
    phone: "080-4545-6789",
    hours: "Mon-Sat: 8:00 AM - 5:00 PM",
    description: "Organic waste composting and biogas generation facility",
    lat: 12.9698,
    lng: 77.7500,
  },
  {
    id: "5",
    name: "BBMP Dry Waste Collection Center",
    type: "recycling",
    address: "Koramangala, Bengaluru",
    phone: "080-2553-1188",
    hours: "Daily: 7:00 AM - 7:00 PM",
    description: "Official municipal dry waste collection and segregation center",
    lat: 12.9279,
    lng: 77.6271,
  },
  {
    id: "6",
    name: "Karo Sambhav",
    type: "e-waste",
    address: "Indiranagar, Bengaluru",
    phone: "1800-102-4649",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    description: "Producer Responsibility Organization for e-waste management",
    lat: 12.9784,
    lng: 77.6408,
  },
];

function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  const handleLocate = () => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14);
    });
  };

  useEffect(() => {
    const btn = document.getElementById("locate-btn");
    btn?.addEventListener("click", handleLocate);
    return () => btn?.removeEventListener("click", handleLocate);
  }, [map]);

  return position ? (
    <Marker
      position={position}
      icon={L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })}
    >
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

export const RecycleMap = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHubs = recycleHubs.filter((hub) => {
    const matchesFilter = filter === "all" || hub.type === filter;
    const matchesSearch =
      hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "e-waste":
        return ewasteIcon;
      case "composting":
        return compostIcon;
      default:
        return recycleIcon;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "e-waste":
        return <Trash2 className="w-4 h-4" />;
      case "composting":
        return <Leaf className="w-4 h-4" />;
      default:
        return <Recycle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground mb-4">
            Find recycling centers, e-waste collection points, and composting facilities near you in Bengaluru.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Facilities</SelectItem>
                <SelectItem value="recycling">Recycling Centers</SelectItem>
                <SelectItem value="e-waste">E-Waste Collection</SelectItem>
                <SelectItem value="composting">Composting Facilities</SelectItem>
              </SelectContent>
            </Select>
            <Button id="locate-btn" className="gradient-primary text-primary-foreground">
              <Navigation className="w-4 h-4 mr-2" /> My Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {filteredHubs.map((hub) => (
            <Marker key={hub.id} position={[hub.lat, hub.lng]} icon={getIcon(hub.type)}>
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-primary">{hub.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{hub.description}</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{hub.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{hub.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{hub.phone}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Featured Locations */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4">Featured Recycling Centers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHubs.slice(0, 6).map((hub) => (
            <Card key={hub.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-primary">{hub.name}</CardTitle>
                  <span className={`p-1.5 rounded-full ${
                    hub.type === "e-waste" ? "bg-blue-100 text-blue-600" :
                    hub.type === "composting" ? "bg-lime-100 text-lime-600" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {getTypeIcon(hub.type)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{hub.address}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{hub.description}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />
                    <span className="text-muted-foreground">{hub.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-primary" />
                    <span className="text-muted-foreground">{hub.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
