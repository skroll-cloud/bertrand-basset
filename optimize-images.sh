#!/bin/bash

# ============================================
# SCRIPT D'OPTIMISATION IMAGES - Bertrand Basset Portfolio
# ============================================
# Ce script :
# 1. Convertit tous les formats (TIFF, PNG, etc.) en JPEG
# 2. Redimensionne pour le web (max 2000px de large)
# 3. Compresse en qualité 85% (bon compromis qualité/poids)
# 4. Crée des thumbnails pour le chargement rapide
# ============================================

# Vérifier que ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick n'est pas installé."
    echo "Installe-le avec : brew install imagemagick (Mac) ou apt install imagemagick (Linux)"
    exit 1
fi

# Dossier source (à adapter)
SOURCE_DIR="./images"
OUTPUT_DIR="./images-optimized"
THUMB_DIR="./images-optimized/thumbnails"

# Paramètres
MAX_WIDTH=2000
THUMB_HEIGHT=150
QUALITY=85

# Créer les dossiers de sortie
mkdir -p "$OUTPUT_DIR"
mkdir -p "$THUMB_DIR"

echo "🖼️  Optimisation des images du portfolio Bertrand Basset"
echo "========================================================"
echo "Source: $SOURCE_DIR"
echo "Sortie: $OUTPUT_DIR"
echo "Largeur max: ${MAX_WIDTH}px"
echo "Qualité JPEG: ${QUALITY}%"
echo ""

# Compteur
count=0
total=$(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.tiff" -o -iname "*.tif" -o -iname "*.webp" \) | wc -l)

echo "📁 $total images trouvées"
echo ""

# Parcourir toutes les images
find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.tiff" -o -iname "*.tif" -o -iname "*.webp" \) | while read -r file; do
    count=$((count + 1))
    
    # Extraire le chemin relatif et le nom de fichier
    relative_path="${file#$SOURCE_DIR/}"
    dir_path=$(dirname "$relative_path")
    filename=$(basename "$file")
    name="${filename%.*}"
    
    # Créer le sous-dossier si nécessaire
    mkdir -p "$OUTPUT_DIR/$dir_path"
    mkdir -p "$THUMB_DIR/$dir_path"
    
    # Fichier de sortie (toujours en .jpg)
    output_file="$OUTPUT_DIR/$dir_path/${name}.jpg"
    thumb_file="$THUMB_DIR/$dir_path/${name}.jpg"
    
    echo "[$count/$total] $relative_path"
    
    # Convertir et redimensionner l'image principale
    convert "$file" \
        -resize "${MAX_WIDTH}x${MAX_WIDTH}>" \
        -quality $QUALITY \
        -strip \
        -interlace Plane \
        -colorspace sRGB \
        "$output_file" 2>/dev/null
    
    # Créer la thumbnail
    convert "$file" \
        -resize "x${THUMB_HEIGHT}" \
        -quality 80 \
        -strip \
        "$thumb_file" 2>/dev/null
    
    # Afficher la taille avant/après
    if [ -f "$output_file" ]; then
        original_size=$(du -h "$file" | cut -f1)
        new_size=$(du -h "$output_file" | cut -f1)
        echo "   ✓ $original_size → $new_size"
    fi
done

echo ""
echo "✅ Optimisation terminée !"
echo ""

# Résumé
echo "📊 Résumé :"
original_total=$(du -sh "$SOURCE_DIR" 2>/dev/null | cut -f1)
optimized_total=$(du -sh "$OUTPUT_DIR" 2>/dev/null | cut -f1)
echo "   Taille originale : $original_total"
echo "   Taille optimisée : $optimized_total"
echo ""
echo "📂 Images optimisées dans : $OUTPUT_DIR"
echo "📂 Thumbnails dans : $THUMB_DIR"
echo ""
echo "⚠️  Prochaine étape :"
echo "   1. Vérifie la qualité des images dans $OUTPUT_DIR"
echo "   2. Si OK, remplace le dossier images par images-optimized"
echo "   3. Mets à jour les chemins si nécessaire dans gallery.js"
