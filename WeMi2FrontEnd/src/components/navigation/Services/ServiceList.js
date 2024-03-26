/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import NavLink  from 'components/router/NavLink';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import Carousel, {CreateCaptionArr} from 'components/ui/Carousel';
import Select from 'components/ui/Select';
import WindowSize from 'components/ui/Breakpoints';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import Loader from 'components/ui/Loader';
import AnchorLink from 'components/ui/AnchorLink';
import { colors } from 'theme';
import styled, {css} from 'styled-components';
import { ListaServizi } from 'mocks/ListaServizi';
import {graphqlRequest, CategoriaHomePage} from 'redux-modules/actions/authActions';
import { localeSelector } from 'redux-modules/selectors/localeSelectors';
import { isNullOrUndefined } from 'util';
import {serviziByCategoria as serviziByCategoriaQ} from './graphQLServices';

const ColumnTabs = styled(Column)`
`;

const ServiceCard = styled(Column)`
  text-align: center;
  display: none;
  // @keyframes fadeIn {
  //   from {display: none; transform: scale(0, 0); }
  //   to {display: block; transform: scale(1, 1); }
  // }  
  // animation: fadeIn .5s ease-in-out;
  transition: all .3s ease-in-out;
  ${props => props.active && css`
  display: block;
  // animation-name: fadeIn;
  // animation-duration: .5s;

  &:hover {
    span {
    color: ${colors.primary}!important
    }
  }
  transition: all .2s linear;
  text-align: center;
  justify-content: center;
  margin: auto;
  span {
    word-break: break-word;
    margin-left: auto;
    margin-right: auto;
  }
  transition: all .3s ease-in-out;
  `}
`;

const ButtonTabs = styled(Button)`
min-width: unset;
  white-space: normal;
  width: 100%;
  ${media.md`
  width: 110%;
  font-size: 60%;
  padding: 0 1em;
  `}
  ${media.lg`
  width: 100%;
  font-size: 70%;
  `}
  color: #55565a !important;
  background-color: ${colors.grey} !important;
  justify-content: center !important;
  line-height: 1;
  min-height: 3rem;
  box-shadow: none;

  border: none;
  ${props => !props.disabled && css`
  :hover {
    border: none !important;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)
  }`
}
  :focus {
    outline:0;
    background-color: ${colors.primary} !important;
    color: white !important;}
  }
  ${props => props.active && css`
    border: none !important;
    color: white !important;
    background-color: ${colors.primary} !important;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)!important;
    `}
  transition: all .2s linear;

`;

const MyText = styled.div`
display: flex;
align-items: center;
width: 70%;
&:hover {
  color: ${colors.primary}!important
}
margin: auto;
min-height: 4.5em
${media.md`
width: 90%;
min-height: 5em;
`}
${media.lg`
width: 70%;
min-height: 3.5em;
`}
transition: all .2s linear;

`;

const MyImage = styled.img`
  display: block;
  @keyframes opacityServCards {
    from {opacity: 0}
    to {opacity: 1 }
  }  
  animation: opacityServCards .2s linear;
  margin-left: auto;
  margin-right: auto;
  height: 15em;
  ${media.md`
  height: 10em;
  width: 10em
  `}
`;

const Services = ({ locale, categorie, graphqlRequest, CategoriaHomePage, categoria }) => {
  const [selectedValue, setSelectedValue] = useState({ id: 0, value: 'TUTTI' });
  const [CarouselPosition, setCarouselPosition] = useState(0);
  let AreeArray = [];
  let CategorieArray = [];
  let carouselArray = categorie ? CreateCaptionArr(categorie.allCategorie, 1) : [];

  const FilterArea = (array) => {
    let areaArr = [];
    if(categorie && array) {
      for(let i = 0; i < array.length; i +=1) {
        for(let j = 0; j < array[i].areeCategoria.length; j +=1) {
          let found = -1;
          for(var t = 0; t < areaArr.length; t+=1)
          if(areaArr[t].idArea === array[i].areeCategoria[j].idArea)
                found= t;
          if(found===-1)
          areaArr.push(array[i].areeCategoria[j]);
      }
    }
  }
  AreeArray = areaArr;
  return (AreeArray)
}

const FilterArea2 = (array) => {
  let areaArr = [];
  if(array.areeCategoria.length >0) {
    for(let i = 0; i < array.areeCategoria.length; i +=1) {
        let found = -1;
        for(var t = 0; t < areaArr.length; t+=1)
        if(areaArr[t].idArea === array.areeCategoria[i].idArea)
              found= t;
        if(found===-1)
        areaArr.push(array.areeCategoria[i].idArea);
    }
}
CategorieArray = areaArr;
return (CategorieArray)
}

 categorie && FilterArea(categorie.allCategorie)

  const cambiaCategoria = (e, categoriaValue) => {
    CategoriaHomePage(categoriaValue);
  };
  const getSelectValue = selectValue => {
    CategoriaHomePage(selectValue.id);
    setSelectedValue(selectValue)
    setCarouselPosition(0)
  };

  const AllAreas = categorie && categorie.allCategorie ? [
    {idArea:  AreeArray.map(tutti => tutti.idArea),
      txTitoloArea: {it: "TUTTI"}},
    ...AreeArray
  ]: categorie && categorie.allCategorie?  [{idArea: 0,txTitoloArea: {it: "TUTTI"}}] : []

  const loadingArr = ['', '', '', '',];
  // const loadingCardsArr = ['', '', '', '', '','', '', '', '', '','', '', '', '', ''];


  const createSelectOptionsItemsArray = AllAreas.length > 1 ? AllAreas.map(item => {
    return {value: item.idArea, 
    textValue: item.txTitoloArea[locale]} 
  }) : null

  const CarouselFilteredArray = 
  carouselArray.length > 0 ? carouselArray.filter(item => {
    let InvolvedAreas =  item[0].areeCategoria[0] && FilterArea2(item[0])
   if(  InvolvedAreas && InvolvedAreas[0] === categoria)
   return item 
  }) : carouselArray.map(item => item)

  return (
    <div>
      <Row fluid justifycontent="space-around">
        { WindowSize() > 768 ? (AllAreas.length >= 1  ? AllAreas.map((tab,index) => (
          <ColumnTabs md={2} lg={2} sm={12} xs={12} padding="0" key={index.toString()} >
              <ButtonTabs 
              fontSize="f7"
               title="Area di primo livello"
              active={
                (Array.isArray(tab.idArea) && (Array.isArray(categoria) && (categoria.length === 0 || tab.idArea.filter(x => categoria.includes(x)))) )
                || tab.idArea === categoria} intlFormatter value={tab.txTitoloArea[locale]}  
              onClick={e => cambiaCategoria(e, tab.idArea)} />
          </ColumnTabs>
        )) : 
         <> {loadingArr.map((_,index) => (
               <ColumnTabs md={2} lg={2} sm={12} xs={12} padding="0"  key={index.toString()}>
              <ButtonTabs fontSize="f7" value=" "
              active={false} 
              disabled
              type="disabled"
              child="1"
            />
          </ColumnTabs>))}
        </> )
         :
<Row fluid margin="2em 0">
            {createSelectOptionsItemsArray && 
            <Select 
                          getValue={getSelectValue}
                          selectedValue={selectedValue}
                          name="Categoria:"
                          items={createSelectOptionsItemsArray}
                          intlFormatter
                          intlPlaceholder="Categoria:"
            /> }
            </Row> }
      </Row>
     
      <Row fluid justifycontent="space-around">
         {window.innerWidth > 768 ? categorie &&  categorie.allCategorie&& categorie.allCategorie.length > 0 ? categorie.allCategorie.sort((a,b)=>{
           return a.idCategoria==516?-1:b.idCategoria==516?1:0;
         }).map((j,index) => {
        let InvolvedAreas = j && FilterArea2(j)
         return (       
        <ServiceCard lg={4} md={4} sm={12} xs={12} padding="3em 0 0" key={index.toString()}  onClick={()=> graphqlRequest(serviziByCategoriaQ(j.idCategoria))}
        active={(j.idCategoria==516 ||InvolvedAreas.includes(categoria) || Array.isArray(categoria) && categoria.filter(x => InvolvedAreas.includes(x)))}>
              <NavLink to={j.sottotipo === 99 ? '/menuTcb' : `/c/${j.idCategoria}`} width="100%" margin="auto" >
              <Column xs="12" flex direction="column" padding="0">
             <MyImage src={isNullOrUndefined(j.media)? ListaServizi.arrServizi[0].imgSrc : j.media.oj_media} />
             <MyText>
               <Text size="f7" transform="uppercase" value={j.txTitoloCategoria[locale]} padding="1em"/>
               </MyText> 
               </Column>
               {/* <MyButton submit value="Scopri" onClick={()=> graphqlRequest(serviziByCategoriaQ(j.idCategoria))} /> */}
              </NavLink>  
        </ServiceCard> )
        }
      ) :  
      <Loader size="4em" margin="3em auto" width="auto" />
      // loadingCardsArr.map(el => (
      // <LoadingServiceCard lg={4} md={4} sm={12} xs={12} padding="3em 0 0">
      //      <LoadingImg  />
      //      <MyText loading>
      //        <Text size="f7" transform="uppercase" value={''} padding="1em"/>
      //        </MyText> 
      //        {/* <NavLink to={`/`} width="80%" margin="auto" >
      //        <MyButton submit value="......."  />
      //       </NavLink>   */}
      //    </LoadingServiceCard> ))
      :
      <Carousel
      autoPlay="5000"
      arrowbgcolor="primary"
      setPosition={setCarouselPosition}
      position={CarouselPosition}
      arrowcolor="white"
      dots={CarouselFilteredArray && CarouselFilteredArray.length > 0 ? "overlay" : null}
      dotcolor="grey"
      dotActiveColor="primary"
      dotSize="0.5em"
      arrowSize="1x"
      arrowWrapperSize="6vw"
      height="auto">
    {CarouselFilteredArray && CarouselFilteredArray.length > 0 ? CarouselFilteredArray.map((slide,index) => {
      return (
         <Row fluid justifycontent="space-around" key={index}>
           { slide.map((j,index) => {
        let InvolvedAreas = j && FilterArea2(j);
        
       if ((j.areeCategoria[0] && j.areeCategoria[0].idArea === categoria) &&
       (InvolvedAreas.includes(categoria) || Array.isArray(categoria) && categoria.filter(x => InvolvedAreas.includes(x)) ))  return (       
        <ServiceCard lg={4} md={4} sm={12} xs={12} padding="3.5em 0" key={index.toString()}
        active={(InvolvedAreas.includes(categoria) || Array.isArray(categoria) && categoria.filter(x => InvolvedAreas.includes(x)) )}>
              <AnchorLink to={`/${locale}/c/${j.idCategoria}`} width="100%" margin="auto">
             <MyImage src={isNullOrUndefined(j.media)? ListaServizi.arrServizi[0].imgSrc : j.media.oj_media} />
             <MyText>
               <Text  
                  transform="uppercase" 
                  letterSpacing="0.05em"
                  size="f7"
                  value={j.txTitoloCategoria[locale]} 
                  padding="1em"
                  letterSpacing="0.05em"
                />
               </MyText> 
              </AnchorLink>  
        </ServiceCard> )})}

      </Row>)}
    )
        :
        carouselArray.map((slide,i) => {
          return (
             <Row fluid justifycontent="space-around" key={i.toString()}>
               { slide.map((j,index) => {
            return (       
            <ServiceCard lg={4} md={4} sm={12} xs={12} padding="4em 0" key={index.toString()}
            active={true}>
              <AnchorLink to={`/${locale}/c/${j.idCategoria}`} width="100%" margin="auto">
                 <MyImage src={isNullOrUndefined(j.media)? ListaServizi.arrServizi[0].imgSrc : j.media.oj_media} />
                 <MyText>
                   <Text 
                      size="f7" 
                      transform="uppercase" 
                      letterSpacing="0.05em"
                      value={j.txTitoloCategoria[locale]} 
                      padding="1em"
                  />
                   </MyText> 
                  </AnchorLink>  
            </ServiceCard> )})}
    
          </Row>)}
        )
        }
      </Carousel>
      }
      </Row>
    </div>
  );
};

Services.displayName = 'Services';
const mapStoreToProps = store => ({
  locale: localeSelector(store),
  loaded: store.graphql.loaded,
  categoria: store.user.cat
});
const mapDispatchToProps = ({
  graphqlRequest,
  CategoriaHomePage,
})
export default connect(mapStoreToProps,mapDispatchToProps)(Services);
