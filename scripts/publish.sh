#!/bin/bash

# 发布版本
function pub(){
    # 获取项目package.json文件
    path="./package.json"
    # 获取项目版本号
    version=$(awk '/version/{gsub(/("|",)/,"",$2);print $2};' $path)

    if [ -z "$version" ]; then
         exit 1
    fi

    # 获取tag
    tag=${version#*-}
    tag=${tag%.*}
    case $tag in
        "alpha")  tag="alpha"
        ;;
        "beta")  tag="beta"
        ;;
        "next")  tag="next"
        ;;
        *)  tag="latest"
        ;;
    esac
    echo $version, $tag
    pnpm publish --no-git-checks --tag $tag --access=public
}

pub