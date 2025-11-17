#!/bin/bash

# ⚠️ DEPRECATED: Este script está obsoleto
#
# Este projeto agora usa semantic-release para automação completa de releases.
# Os releases são feitos automaticamente via GitHub Actions quando você faz
# commits seguindo o padrão Conventional Commits.
#
# Para mais informações, consulte CONTRIBUTING.md
#
# Se você realmente precisa fazer um release manual (não recomendado),
# descomente o código abaixo.

echo "⚠️  AVISO: Este script está DEPRECATED"
echo ""
echo "Este projeto agora usa semantic-release para releases automáticos."
echo ""
echo "Como fazer release:"
echo "1. Faça commits seguindo Conventional Commits (feat:, fix:, etc)"
echo "2. Faça push para main, develop ou beta"
echo "3. O GitHub Actions criará o release automaticamente"
echo ""
echo "Para commits interativos, use: yarn commit"
echo ""
echo "Consulte CONTRIBUTING.md para mais detalhes."
echo ""
read -p "Deseja continuar com o release manual? (não recomendado) [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Release manual cancelado."
    exit 0
fi

echo ""
echo "⚠️  Continuando com release manual (DEPRECATED)..."
echo ""

# Script para fazer release da JCMlibrary
# Uso: ./release.sh [patch|minor|major]

set -e

# Verificar se o parâmetro foi fornecido
if [ -z "$1" ]; then
    echo "Uso: ./release.sh [patch|minor|major]"
    echo "Exemplo: ./release.sh patch"
    exit 1
fi

RELEASE_TYPE=$1

# Validar tipo de release
if [[ "$RELEASE_TYPE" != "patch" && "$RELEASE_TYPE" != "minor" && "$RELEASE_TYPE" != "major" ]]; then
    echo "❌ Erro: Tipo de release inválido. Use: patch, minor ou major"
    exit 1
fi

# Verificar se estamos na branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Erro: Você deve estar na branch main para fazer release"
    echo "Branch atual: $CURRENT_BRANCH"
    exit 1
fi

# Verificar se o working directory está limpo
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erro: Working directory não está limpo. Faça commit das mudanças primeiro."
    git status --short
    exit 1
fi

# Fazer pull das últimas mudanças
echo "🔄 Fazendo pull das últimas mudanças..."
if ! git pull origin main; then
    echo "❌ Erro: Falha ao fazer pull das mudanças."
    exit 1
fi

# Verificar se o último commit já é uma release
echo "🔍 Verificando se o último commit já é uma release..."
LAST_COMMIT_MESSAGE=$(git log -1 --pretty=format:"%s")
if [[ "$LAST_COMMIT_MESSAGE" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+ ]]; then
    echo "❌ Erro: O último commit já é uma release: '$LAST_COMMIT_MESSAGE'"
    echo "   Faça novos commits antes de criar um novo release."
    exit 1
fi

# Limpar e construir
echo "🏗️  Limpando e construindo..."
if ! yarn clean; then
    echo "❌ Erro: Falha ao limpar o projeto."
    exit 1
fi

if ! yarn build; then
    echo "❌ Erro: Falha na construção do projeto."
    exit 1
fi

# Executar testes (se existirem)
echo "🧪 Executando testes..."
if ! yarn test; then
    echo "❌ Erro: Testes falharam. Release cancelado."
    exit 1
fi

# Atualizar versão
echo "📝 Atualizando versão ($RELEASE_TYPE)..."
if ! npm version $RELEASE_TYPE; then
    echo "❌ Erro: Falha ao atualizar versão."
    exit 1
fi

# Obter a nova versão
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✨ Nova versão: v$NEW_VERSION"

# Criar/atualizar tag latest
echo "🏷️  Criando/atualizando tag latest..."
git tag -f latest
git tag -f $NEW_VERSION

# Fazer push do commit e das tags
echo "📤 Fazendo push do commit e tags..."
if ! git push origin main; then
    echo "❌ Erro: Falha ao fazer push do commit."
    exit 1
fi

if ! git push origin --tags --force; then
    echo "❌ Erro: Falha ao fazer push das tags."
    exit 1
fi

echo "🎉 Release v$NEW_VERSION criado com sucesso!"
echo ""
echo "📦 Para usar em outros projetos:"
echo "yarn add linkiez/JCMlibrary#v$NEW_VERSION (versão específica)"
echo "yarn add linkiez/JCMlibrary#latest (sempre a versão mais recente)"
echo ""
echo "🔗 GitHub Release: https://github.com/linkiez/JCMlibrary/releases/tag/v$NEW_VERSION"
