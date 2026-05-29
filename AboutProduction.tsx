import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Youtube } from "lucide-react";
import Logo from "@/components/ui/Logo";

const footerLinks = {
  catalog: [
    { href: "/catalog/epdm-crumbs", label: "ЭПДМ крошка" },
    { href: "/catalog/rubber-crumbs", label: "Резиновая крошка" },
    { href: "/catalog/polyurethane-glue", label: "Полиуретановый клей" },
    { href: "/catalog/ready-coverings", label: "Готовые изделия" },
  ],
  services: [
    { href: "/calculator", label: "Калькулятор материалов" },
    { href: "/color-mixer", label: "Миксер цветов" },
    { href: "/price-request", label: "Запрос прайса" },
    { href: "/projects", label: "Наши объекты" },
  ],
  company: [
    { href: "/about", label: "О компании" },
    { href: "/articles", label: "Статьи" },
    { href: "/contacts", label: "Контакты" },
    { href: "/privacy", label: "Политика конфиденциальности" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo isScrolled={false} forceLight />
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Производство резиновой и EPDM крошки, полиуретанового клея.
              Укладка бесшовных покрытий под ключ для детских и спортивных площадок.
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm">
              <a
                href="tel:+74992830732"
                className="flex items-center gap-3 text-gray-300 hover:text-accent-DEFAULT transition-colors"
              >
                <Phone className="w-4 h-4 text-accent-DEFAULT flex-shrink-0" />
                +7 (499) 283-07-32
              </a>
              <a
                href="mailto:info@mosepdm.ru"
                className="flex items-center gap-3 text-gray-300 hover:text-accent-DEFAULT transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-DEFAULT flex-shrink-0" />
                info@mosepdm.ru
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-accent-DEFAULT flex-shrink-0 mt-0.5" />
                <span>141200, Московская область, г. Пушкино</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent-DEFAULT transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent-DEFAULT transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Каталог
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.catalog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Сервисы
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Компания
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MOSEPDM. Все права защищены.</p>
          <p>Производство в г. Пушкино, Московская область</p>
        </div>
      </div>
    </footer>
  );
}
