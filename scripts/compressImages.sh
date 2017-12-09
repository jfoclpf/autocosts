

cd ../src/images/

echo ""
echo "Compressing images in src/"
echo ""

for f in $(find . -name '*.jpg')
do 
  echo "Compressing $f"
  convert $f -sampling-factor 4:2:0 -strip -quality 85 -interlace Plane -colorspace RGB $f.min
  rm $f
  mv $f.min $f 
done

for f in $(find . -name '*.png')
do
  echo "Compressing $f"
  convert $f -strip $f.min
  rm $f
  mv $f.min $f
done

echo "All images compressed"



