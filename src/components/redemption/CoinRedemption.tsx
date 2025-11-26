import { useState } from "react";
import { Coins, Wallet, Smartphone, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "upi", name: "UPI ID", icon: Wallet, placeholder: "yourname@upi" },
  { id: "phonepe", name: "PhonePe", icon: Smartphone, placeholder: "Enter PhonePe number" },
  { id: "gpay", name: "Google Pay", icon: CreditCard, placeholder: "Enter GPay number" },
];

interface CoinRedemptionProps {
  ecoCoins: number;
  onRedeem: (amount: number) => void;
}

export const CoinRedemption = ({ ecoCoins, onRedeem }: CoinRedemptionProps) => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentId, setPaymentId] = useState("");
  const [coinsToRedeem, setCoinsToRedeem] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const coinsValue = parseInt(coinsToRedeem) || 0;
  const rupeesValue = (coinsValue / 100).toFixed(2);
  const minCoins = 100;

  const handleRedeem = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to redeem coins");
      return;
    }

    if (coinsValue < minCoins) {
      toast.error(`Minimum ${minCoins} coins required for redemption`);
      return;
    }

    if (coinsValue > ecoCoins) {
      toast.error("Insufficient eco-coins");
      return;
    }

    if (!paymentId.trim()) {
      toast.error("Please enter your payment ID");
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store redemption locally
    const redemptions = JSON.parse(localStorage.getItem("proplanet_redemptions") || "[]");
    redemptions.push({
      id: Date.now(),
      userId: user?.id,
      coins: coinsValue,
      amount: parseFloat(rupeesValue),
      method: paymentMethod,
      paymentId,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("proplanet_redemptions", JSON.stringify(redemptions));

    onRedeem(coinsValue);
    setIsProcessing(false);
    setIsOpen(false);
    setCoinsToRedeem("");
    setPaymentId("");

    toast.success(
      `Redemption request submitted! ₹${rupeesValue} will be transferred to your ${paymentMethods.find(p => p.id === paymentMethod)?.name} within 24-48 hours.`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-eco-coin text-eco-coin hover:bg-eco-coin hover:text-foreground">
          <Wallet className="w-4 h-4 mr-2" /> Redeem Coins
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-eco-coin" />
            Redeem Eco-Coins
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Current Balance */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-primary">{ecoCoins} coins</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Value</p>
                <p className="text-xl font-semibold text-foreground">₹{(ecoCoins / 100).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Coins to Redeem */}
          <div className="space-y-2">
            <Label>Coins to Redeem (Min: {minCoins})</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={coinsToRedeem}
              onChange={(e) => setCoinsToRedeem(e.target.value)}
              min={minCoins}
              max={ecoCoins}
            />
            {coinsValue > 0 && (
              <p className="text-sm text-muted-foreground">
                You will receive: <span className="font-semibold text-primary">₹{rupeesValue}</span>
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label>Select Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all",
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <RadioGroupItem value={method.id} id={method.id} />
                  <method.icon className="w-5 h-5 text-primary" />
                  <Label htmlFor={method.id} className="cursor-pointer flex-1">
                    {method.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment ID */}
          <div className="space-y-2">
            <Label>
              {paymentMethods.find((m) => m.id === paymentMethod)?.name} ID
            </Label>
            <Input
              placeholder={paymentMethods.find((m) => m.id === paymentMethod)?.placeholder}
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
            />
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Redemptions are processed within 24-48 hours. Minimum redemption is {minCoins} coins (₹1).
              100 eco-coins = ₹1.
            </p>
          </div>

          <Button
            onClick={handleRedeem}
            disabled={isProcessing || coinsValue < minCoins || coinsValue > ecoCoins || !paymentId.trim()}
            className="w-full gradient-primary text-primary-foreground"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Redeem ₹{rupeesValue}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
