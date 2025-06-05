import { Facebook, Instagram, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
interface SocialIconsProps {
  variant?: 'floating' | 'footer' | 'mobile-visible';
  showOnProductPages?: boolean;
}
export const SocialIcons = ({
  variant = 'floating',
  showOnProductPages = true
}: SocialIconsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const socialLinks = [{
    name: 'WhatsApp',
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
        </svg>,
    href: 'https://wa.me/5543984273723',
    color: 'hover:text-green-400'
  }, {
    name: 'Instagram',
    icon: <Instagram className="w-5 h-5" />,
    href: 'https://www.instagram.com/arcadegames.arcadegames/',
    color: 'hover:text-pink-400'
  }, {
    name: 'Facebook',
    icon: <Facebook className="w-5 h-5" />,
    href: 'https://facebook.com',
    color: 'hover:text-blue-400'
  }];
  if (variant === 'footer') {
    return <>
        {socialLinks.map(social => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className={`text-gray-400 transition-colors duration-300 ${social.color}`}>
            {social.icon}
          </a>)}
      </>;
  }
  if (variant === 'mobile-visible') {
    return <div className="flex justify-center space-x-4 md:hidden">
        {socialLinks.map(social => <Button key={social.name} asChild variant="ghost" size="icon" className={`w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-gray-300 transition-all duration-300 ${social.color} hover:bg-gray-800 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]`}>
            <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.name}>
              {social.icon}
            </a>
          </Button>)}
      </div>;
  }
  if (!showOnProductPages) {
    return null;
  }
  return <>
      {/* Desktop - Floating Icons */}
      <div className="hidden md:flex fixed top-6 right-6 z-50 flex-col space-y-3">
        {socialLinks.map(social => <Button key={social.name} asChild variant="ghost" size="icon" className={`w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-gray-300 transition-all duration-300 ${social.color} hover:bg-gray-800 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]`}>
            <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.name}>
              {social.icon}
            </a>
          </Button>)}
      </div>

      {/* Mobile - Sidebar */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            
          </SheetTrigger>
          <SheetContent side="top" className="bg-gray-900 border-gray-700">
            <div className="flex justify-center space-x-6 pt-4">
              {socialLinks.map(social => <Button key={social.name} asChild variant="ghost" size="icon" className={`w-12 h-12 bg-gray-800 border border-gray-600 text-gray-300 transition-all duration-300 ${social.color} hover:bg-gray-700`} onClick={() => setIsOpen(false)}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.name}>
                    {social.icon}
                  </a>
                </Button>)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>;
};