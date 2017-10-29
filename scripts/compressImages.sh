

cd ../website/images/

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

if [ -z "$1" ]
then
  exit
fi

if [ $1 = "upload" ]
then  
  
  if [ -z "$2" ]
  then
    echo "Define where to upload: 'work' or 'prod'"
    exit
  fi
  
  if [ $2 = "prod" ]
  then
    dir="public_html"
  fi

  if [ $2 = "work" ]
  then
    dir="work"
  fi

  rsync -rav -e 'ssh -p 2222' --include '*.png' --include='*.jpg' . jfolpf@autocosts.info:~/$dir/images/

fi

