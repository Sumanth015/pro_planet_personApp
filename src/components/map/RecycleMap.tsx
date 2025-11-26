import { useState } from "react";
import { MapPin, Phone, Clock, Recycle, Trash2, Leaf, Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export const RecycleMap = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHub, setSelectedHub] = useState<RecycleHub | null>(null);

  const filteredHubs = recycleHubs.filter((hub) => {
    const matchesFilter = filter === "all" || hub.type === filter;
    const matchesSearch =
      hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "e-waste":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "composting":
        return "bg-lime-100 text-lime-600 border-lime-200";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  // Generate OpenStreetMap embed URL with markers
  const mapCenter = selectedHub 
    ? `${selectedHub.lat},${selectedHub.lng}` 
    : "12.9716,77.5946";
  const zoom = selectedHub ? 15 : 12;
  
  const openInMaps = (hub: RecycleHub) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${hub.lat},${hub.lng}`, '_blank');
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
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location List */}
        <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {filteredHubs.map((hub) => (
            <Card 
              key={hub.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedHub?.id === hub.id ? 'ring-2 ring-primary shadow-md' : ''
              }`}
              onClick={() => setSelectedHub(hub)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getTypeColor(hub.type)}`}>
                    {getTypeIcon(hub.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{hub.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {hub.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {hub.hours}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredHubs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Recycle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No locations found</p>
            </div>
          )}
        </div>

        {/* Map Iframe */}
        <div className="lg:col-span-2">
          <div className="h-[500px] rounded-xl overflow-hidden shadow-lg bg-muted">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=77.45,12.8,77.8,13.1&layer=mapnik&marker=${mapCenter}`}
            />
          </div>
          
          {/* Selected Location Details */}
          {selectedHub && (
            <Card className="mt-4 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{selectedHub.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedHub.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => openInMaps(selectedHub)}
                    className="gradient-primary text-primary-foreground"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" /> Open in Maps
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{selectedHub.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{selectedHub.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{selectedHub.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* All Locations Grid */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4">All Recycling Centers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHubs.map((hub) => (
            <Card key={hub.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-primary">{hub.name}</CardTitle>
                  <span className={`p-1.5 rounded-full border ${getTypeColor(hub.type)}`}>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => openInMaps(hub)}
                >
                  <MapPin className="w-4 h-4 mr-2" /> Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
