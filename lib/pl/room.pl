use strict;
#use warnings;
use utf8;
use open ":utf8";
use open ":std";
use Fcntl;
use HTML::Template;

my $id = $::in{'id'}; #部屋ID

my %rooms = %set::rooms;
my %games = %set::games;

###################
### 部屋の有無をチェック
error('ルームがありません') if !exists($rooms{$id});

my @tabs = $rooms{$id}{'tab'} ? @{$rooms{$id}{'tab'}} : ('メイン','サブ'); 

###################
### ディレクトリ・ファイルが無い場合
my $key = random_key(4);
if (!-d "./room/${id}"){
  mkdir "./room/${id}";
}
if (!-f "./room/${id}/room.dat"){
  sysopen (my $FH, "./room/${id}/room.dat", O_WRONLY | O_TRUNC | O_CREAT, 0666);
    print $FH '{"tab":{';
    my $i = 0;
    foreach my $tab (@tabs){
      print $FH ',' if $i;
      $i++;
      print $FH '"'.$i.'":"'.$tab.'"';
    }
    print $FH '}}';
  close($FH);
  
  sysopen (my $FH, "./room/${id}/log-num-${key}.dat", O_WRONLY | O_TRUNC | O_CREAT, 0666);
    print $FH '0';
  close($FH);
  sysopen (my $FH, "./room/${id}/log-key.dat", O_WRONLY | O_TRUNC | O_CREAT, 0666);
    print $FH $key;
  close($FH);
}
if (!-f "./room/${id}/log-all.dat"){
  sysopen (my $FH, "./room/${id}/log-all.dat", O_WRONLY | O_TRUNC | O_CREAT, 0666);
    print $FH ">$rooms{$id}{'name'}<>".join(',',@tabs)."\n";
  close($FH);
}
if (!-f "./room/${id}/log-pre.dat"){
  sysopen (my $FH, "./room/${id}/log-pre.dat", O_WRONLY | O_TRUNC | O_CREAT, 0666);
  close($FH);
}

###################
### テンプレート読み込み
my $ROOM;
$ROOM = HTML::Template->new(
  filename => './lib/html/room.html',
  utf8 => 1,
  loop_context_vars => 1,
  die_on_bad_params => 0,
  die_on_missing_include => 0,
  case_sensitive => 1,
  global_vars => 1
);

###################
### 読み込み処理

$ROOM->param(roomId => $id);
$ROOM->param(title => $rooms{$id}{'name'});

my $game = $rooms{$id}{'game'};
$ROOM->param(gameSystem => $game);
$ROOM->param(gameSystemName => $games{$game}{'name'} ? $games{$game}{'name'} : $game ? $game : '－');

$ROOM->param(bcdiceAPI => $rooms{$id}{'bcdice'} ? $set::bcdice_api : '');
$ROOM->param(bcdiceSystem => $games{$game}{'bcdice'} ? $games{$game}{'bcdice'} : $game ? $game : 'DiceBot');

my @status = $rooms{$id}{'status'} ? @{$rooms{$id}{'status'}}
           : $games{$game}{'status'} ? @{$games{$game}{'status'}}
           : ('HP','MP','他');
$ROOM->param(SttNameList => join("','", @status));

$ROOM->param(newUnitSttDefault => join(': ',@status).':');

if   ($game eq 'sw2') { $ROOM->param(helpOnSW2 => 1); }
elsif($game eq 'dx3') { $ROOM->param(helpOnDX3 => 1); }
if($rooms{$id}{'bcdice'}) { $ROOM->param(helpOnBCDice => 1); }

my @text_replace;
foreach (@set::replace_help){
  push(@text_replace, {
    'BEFORE' => @{$_}[0],
    'AFTER'  => @{$_}[1],
    'HELP'   => @{$_}[2],
  });
}
$ROOM->param(TextReplace => \@text_replace);

my @random_table;
foreach my $key (sort keys %set::random_table){
  next if !$set::random_table{$key}{'help'};
  push(@random_table, {
    'COMMAND'  => $key,
    'HELP' => $set::random_table{$key}{'help'},
  });
}
$ROOM->param(RandomTable => \@random_table);

###################
### 出力
print "Content-Type: text/html\n\n";
print $ROOM->output;

exit;

sub random_key {
  my @char = (0..9,'a'..'z','A'..'Z');
  my $s;
  1 while (length($s .= $char[rand(@char)]) < $_[0]);
  return $s;
}

1;