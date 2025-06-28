"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Shield, Settings, Check, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { localeConfig, type Locale } from "@/lib/locales";

interface Dictionary {
  title: string;
  meta?: {
    title: string;
    description: string;
    keywords: string;
  };
  buttons: {
    generate: string;
    copy: string;
    copied: string;
  };
  settings: {
    length: string;
    symbols: string;
    uppercase: string;
    lowercase: string;
    numbers: string;
    specialChars: string;
    readable: string;
  };
  strength: {
    weak: string;
    medium: string;
    strong: string;
    label: string;
  };
  messages: {
    copySuccess: string;
    copyDescription: string;
    error: string;
    generateFirst: string;
    copyFailed: string;
  };
}

interface Props {
  dict: Dictionary;
  currentLocale: Locale;
}

export default function PasswordGenerator({ dict, currentLocale }: Props) {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [makeReadable, setMakeReadable] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const isRTL = localeConfig[currentLocale]?.dir === "rtl";

  // Устанавливаем флаг клиентской стороны после монтирования
  useEffect(() => {
    setIsClient(true);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const generatePassword = async () => {
    setIsGenerating(true);

    // Небольшая задержка для анимации
    await new Promise((resolve) => setTimeout(resolve, 200));

    let charset = "";
    let readableCharset = "";

    if (includeUppercase) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      readableCharset += "ABCDEFGHJKMNPQRSTUVWXYZ";
    }
    if (includeLowercase) {
      charset += "abcdefghijklmnopqrstuvwxyz";
      readableCharset += "abcdefghjkmnpqrstuvwxyz";
    }
    if (includeNumbers) {
      charset += "0123456789";
      readableCharset += "23456789";
    }
    if (includeSymbols) {
      charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
      readableCharset += "!@#$%^&*+-=";
    }

    const finalCharset = makeReadable ? readableCharset : charset;

    if (finalCharset === "") {
      setPassword("");
      setIsGenerating(false);
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += finalCharset.charAt(
        Math.floor(Math.random() * finalCharset.length)
      );
    }

    setPassword(newPassword);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (isClient) {
      generatePassword();
    }
  }, [
    isClient,
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    makeReadable,
  ]);

  const copyToClipboard = async () => {
    if (!password) {
      toast({
        title: dict.messages.error,
        description: dict.messages.generateFirst,
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      toast({
        title: dict.messages.copySuccess,
        description: dict.messages.copyDescription,
      });

      // Возвращаем состояние через 2 секунды
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: dict.messages.error,
        description: dict.messages.copyFailed,
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: "", color: "" };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2)
      return { level: score, text: dict.strength.weak, color: "text-red-500" };
    if (score <= 4)
      return {
        level: score,
        text: dict.strength.medium,
        color: "text-yellow-500",
      };
    return {
      level: score,
      text: dict.strength.strong,
      color: "text-green-500",
    };
  };

  const strength = getPasswordStrength();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center relative overflow-hidden ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Language Switcher */}
      <div className={`fixed top-4 z-50 ${isRTL ? "left-4" : "right-4"}`}>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2">
          <Globe className="w-4 h-4 text-white" />
          <select
            value={currentLocale}
            onChange={(e) => switchLanguage(e.target.value as Locale)}
            className="bg-transparent text-white text-sm border-none outline-none appearance-none cursor-pointer"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {Object.entries(localeConfig).map(([code, config]) => (
              <option
                key={code}
                value={code}
                className="bg-gray-800 text-white"
              >
                {config.flag} {config.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card className="w-full max-w-2xl backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-normal bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {dict.title}
          </h1>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Результат - всегда отображается */}
          <div className="space-y-4">
            <div
              className={`flex flex-col sm:flex-row gap-3 ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="relative flex-1">
                <Input
                  value={isClient ? password : ""}
                  readOnly
                  placeholder={isClient ? "" : "••••••••••••"}
                  className={`font-mono text-lg sm:text-2xl md:text-3xl font-normal bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 h-16 sm:h-20 px-4 sm:px-6 py-4 text-center break-all w-full transition-all duration-200 ${
                    isCopied ? "bg-green-500/20 border-green-400" : ""
                  }`}
                  dir="ltr"
                />
                {/* Уведомление о копировании */}
                {isCopied && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium text-sm sm:text-base shadow-lg animate-bounce pointer-events-none z-10">
                    ✓ {dict.buttons.copied}
                  </div>
                )}
                {/* Встроенный индикатор силы пароля */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-md overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      strength.level <= 2
                        ? "bg-gradient-to-r from-red-500 to-red-400"
                        : strength.level <= 4
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                        : "bg-gradient-to-r from-green-500 to-green-400"
                    }`}
                    style={{ width: `${(strength.level / 6) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Кнопки справа на десктопе */}
              <div className="flex gap-3">
                <Button
                  onClick={generatePassword}
                  variant="outline"
                  className="h-12 px-4 sm:h-20 sm:w-20 sm:px-0 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                  disabled={isGenerating}
                >
                  <RefreshCw
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      isGenerating ? "animate-spin" : ""
                    } ${isGenerating ? "" : "sm:mr-0 mr-2"}`}
                  />
                  <span className="sm:hidden">{dict.buttons.generate}</span>
                </Button>
                <Button
                  onClick={copyToClipboard}
                  className={`h-12 px-4 sm:h-20 sm:w-20 sm:px-0 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0 ${
                    isCopied
                      ? "bg-gradient-to-r from-green-500 to-green-400"
                      : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 sm:mr-0 mr-2" />
                      <span className="sm:hidden">{dict.buttons.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 sm:w-6 sm:h-6 sm:mr-0 mr-2" />
                      <span className="sm:hidden">{dict.buttons.copy}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Длина пароля */}
          <div className="space-y-4">
            <div
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Settings className="w-5 h-5 text-purple-400" />
              <Label className="text-sm font-normal text-white">
                {dict.settings.length}: {length[0]} {dict.settings.symbols}
              </Label>
            </div>
            <Slider
              value={length}
              onValueChange={setLength}
              max={50}
              min={4}
              step={1}
              className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-cyan-500 [&_[role=slider]]:border-0"
            />
          </div>

          {/* Настройки символов */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) =>
                    setIncludeUppercase(checked === true)
                  }
                  className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label
                  htmlFor="uppercase"
                  className="text-lg text-gray-200 cursor-pointer"
                >
                  {dict.settings.uppercase}
                </Label>
              </div>

              <div
                className={`flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) =>
                    setIncludeLowercase(checked === true)
                  }
                  className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label
                  htmlFor="lowercase"
                  className="text-lg text-gray-200 cursor-pointer"
                >
                  {dict.settings.lowercase}
                </Label>
              </div>

              <div
                className={`flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) =>
                    setIncludeNumbers(checked === true)
                  }
                  className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label
                  htmlFor="numbers"
                  className="text-lg text-gray-200 cursor-pointer"
                >
                  {dict.settings.numbers}
                </Label>
              </div>

              <div
                className={`flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) =>
                    setIncludeSymbols(checked === true)
                  }
                  className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label
                  htmlFor="symbols"
                  className="text-lg text-gray-200 cursor-pointer"
                >
                  {dict.settings.specialChars}
                </Label>
              </div>

              <div
                className={`flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Checkbox
                  id="readable"
                  checked={makeReadable}
                  onCheckedChange={(checked) =>
                    setMakeReadable(checked === true)
                  }
                  className="border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <Label
                  htmlFor="readable"
                  className="text-lg text-gray-200 cursor-pointer"
                >
                  {dict.settings.readable}
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
