import type { IconT } from '@/components/ui/IconComponent';
import type { ITab } from '@/components/ui/TabBar';

type IconConfig = {
  active: IconT;
  inactive: IconT;
};

const ICON_MAP: Record<ITab, IconConfig> = {
  ColetaDeFornecedor: {
    active: 'ColetaDeFornecedorPreenchido',
    inactive: 'ColetaDeFornecedorVazado',
  },
  ComprovanteDeDespesas: {
    active: 'ComprovanteDeDespesasPreenchido',
    inactive: 'ComprovanteDeDespesasVazado',
  },
  ColetaDeEntregue: {
    active: 'ColetaDeEntreguePreenchido',
    inactive: 'ColetaDeEntregueVazado',
  },
  Relatorio: {
    active: 'RelatorioPreenchido',
    inactive: 'RelatorioVazado',
  },
  Configuracoes: {
    active: 'ConfiguracoesPreenchido',
    inactive: 'ConfiguracoesVazado',
  },
};

export const getTabBarIconName = (route: ITab, isFocused: boolean): IconT => {
  const config = ICON_MAP[route];
  return isFocused ? config.active : config.inactive;
};

export const isTabBarCenter = (route: ITab): boolean => {
  return route === 'ColetaDeEntregue';
};
