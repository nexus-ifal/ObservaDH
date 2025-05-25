// .eslintrc.js
module.exports = {
	// Para que o ESLint não procure configurações em diretórios pai
	root: true,
	// Define os ambientes globais disponíveis (navegador, Node.js)
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	// Configurações do parser
	parserOptions: {
		ecmaVersion: "latest", // Permite o parsing de sintaxe moderna
		sourceType: "module", // Permite o uso de módulos (import/export)
		ecmaFeatures: {
			jsx: true, // Habilita o parsing de JSX
		},
	},
	// As configurações que seu arquivo extend (base)
	// `next/core-web-vitals` é a recomendada pelo Next.js para core web vitals e otimizações
	// `next/typescript` inclui as regras específicas para TypeScript do Next.js
	// `plugin:prettier/recommended` habilita o plugin prettier e desativa regras do ESLint que conflitam com o Prettier
	extends: [
		"next/core-web-vitals",
		"next/typescript", // Garante suporte TypeScript pelo Next.js
		"plugin:prettier/recommended", // Deve ser sempre a última para desativar regras conflitantes
	],
	// Plugins adicionais que você está usando
	plugins: [
		"simple-import-sort", // Para ordenar os imports
		"prettier", // Para rodar o Prettier como uma regra
	],
	// Suas regras personalizadas
	rules: {
		// Garante que o estilo de quebra de linha seja sempre 'unix' (LF)
		"linebreak-style": ["error", "unix"],
		// Configura a ordenação dos imports usando 'simple-import-sort'
		"simple-import-sort/imports": [
			"error",
			{
				groups: [
					// 1. React, pacotes de terceiros ('^@?\w').
					// Exemplo: 'react', '@headlessui/react', 'lodash'
					["^react", "^@?\\w"],
					// 2. Interfaces do domínio da aplicação
					// Exemplo: '@/domain/interfaces/user'
					["^@/domain/interfaces"],
					// 3. Utilitários (lib/utils)
					// Exemplo: '@/lib/utils/format'
					["^@/lib/utils"],
					// 4. Componentes
					// Exemplo: '@/components/ui/button'
					["^@/components"],
					// 5. Mocks (diretórios 'mocks' fora da hierarquia atual)
					// Exemplo: '../../mocks/data'
					["^(\\.\\./mocks)"],
					// 6. Subir de nível no diretório, ex: '../../', '../pasta/'
					["^\\.\\.(?!/?$)", "^\\../?$"],
					// 7. Mesmo diretório, ex: './', './pasta/', './index.ts'
					["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
					// 8. Arquivos CSS/Sass
					// Exemplo: './style.css', '../styles.scss'
					["^.+\\.s?css$"],
				],
			},
		],
		// Habilita a ordenação de exports
		"simple-import-sort/exports": "error",
		// Roda o Prettier como uma regra, marcando as diferenças como erros
		// As opções do Prettier devem ser definidas em um arquivo .prettierrc,
		// esta regra serve para *garantir* que o Prettier seja aplicado.
		"prettier/prettier": "error",
	},
	// Opcional: Ignorar arquivos/diretórios específicos (como .gitignore)
	ignorePatterns: [".next/", "node_modules/", "public/", "out/", "build/"],
};
