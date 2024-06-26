create database db_xlibro;
use db_xlibro;

create table autor(
	cod_aut int primary key auto_increment,
    nom_aut varchar(40) binary character set utf8 collate utf8_bin unique not null,
    naci_aut varchar(40) binary character set utf8 collate utf8_bin not null, -- nacionalidad
    est_aut bit not null
) engine = InnoDB character set utf8;

create table editorial(
	cod_edi int primary key auto_increment,
    nom_edi varchar(40) binary character set utf8 collate utf8_bin unique not null,
    est_edi bit not null
)engine = InnoDB character set utf8;

create table categoria(
	cod_cat int primary key auto_increment,
    nom_cat varchar(40) binary character set utf8 collate utf8_bin unique not null,
    est_cat bit not null
)engine = InnoDB character set utf8;

create table libro(
	cod_lib int primary key auto_increment,
    cod_autor int not null,
    cod_editorial int not null,
    cod_categoria int not null,
    nom_lib varchar(40) binary character set utf8 collate utf8_bin unique not null,
    img_lib varchar(255) binary character set utf8 collate utf8_bin not null,
    info_lib text binary character set utf8 collate utf8_bin not null,
    pag_lib int not null,
    anio_lib year not null,
    stock_lib int not null,
    prec_lib double not null,
    est_lib bit not null,
    
    foreign key (cod_autor) references autor(cod_aut),
    foreign key (cod_editorial) references editorial(cod_edi),
    foreign key (cod_categoria) references categoria(cod_cat)
)engine = InnoDB character set utf8;


insert into autor(nom_aut, naci_aut, est_aut) values('Pablo Nedura','Chileno', 1);
insert into autor(nom_aut, naci_aut, est_aut) values('Mario Vargas','Peruano', 1);

insert into editorial(nom_edi, est_edi) values('Payuyo',1);
insert into editorial(nom_edi, est_edi) values('Milket',1);

insert into categoria(nom_cat, est_cat) values('Drama',1);
insert into categoria(nom_cat, est_cat) values('Gerra',1);

insert into libro(cod_autor, cod_editorial, cod_categoria, nom_lib, img_lib, info_lib, pag_lib, anio_lib, stock_lib, prec_lib, est_lib)
	values(2,1,8,'El SIuu','imagen.jpg','decripcion',244,2019,500,24.90,1);
insert into libro(cod_autor, cod_editorial, cod_categoria, nom_lib, img_lib, info_lib, pag_lib, anio_lib, stock_lib, prec_lib, est_lib)
	values(1,2,1,'El Waos','imagen2.jpg','decripcio2n',54,2023,200,4.90,1);

select * from autor;
select * from editorial;
select * from categoria;
select * from libro;

-- drop table autor;
-- drop table editorial;
-- drop table categoria;
-- drop table libro;

-- PROCEDIMIENTOS ALMACENADOS
DELIMITER //
create procedure sp_ver_autor()
begin
select * from autor;
end //
DELIMITER ;

DELIMITER //
create procedure sp_ver_autor_activo()
begin
select * from autor where est_cat = 1;
end //
DELIMITER ;

DELIMITER //
create procedure sp_add_autor(nomaut varchar(40), naciaut varchar(40), estaut)
DELIMITER ;